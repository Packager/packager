/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */

import { walk } from "estree-walker";
import { isFalsy, isTruthy, flatten, isReference } from "./ast-utils";
import {
    getProxyId,
    HELPERS_ID,
    attachScopes,
    extractAssignedNames,
    makeLegalIdentifier,
    getName
} from "./helpers";
import { PackagerContext } from "packager";

export const reserved = "process location abstract arguments boolean break byte case catch char class const continue debugger default delete do double else enum eval export extends false final finally float for from function goto if implements import in instanceof int interface let long native new null package private protected public return short static super switch synchronized this throw throws transient true try typeof var void volatile while with yield".split(
    " "
);
export const blacklist: any = { __esModule: true };

export const exportsPattern = /^(?:module\.)?exports(?:\.([a-zA-Z_$][a-zA-Z_$0-9]*))?$/;
export const firstpassGlobal = /\b(?:require|module|exports|global)\b/;
export const firstpassNoGlobal = /\b(?:require|module|exports)\b/;
export const importExportDeclaration = /^(?:Import|Export(?:Named|Default))Declaration/;
export const functionType = /^(?:FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)$/;

export const deconflict = (
    scope: any,
    globals: Set<any>,
    identifier: string
) => {
    let i = 1;
    let deconflicted = identifier;

    while (
        scope.contains(deconflicted) ||
        globals.has(deconflicted) ||
        deconflicted in blacklist
    ) {
        deconflicted = `${identifier}_${i}`;
        i += 1;
    }
    scope.declarations[deconflicted] = true;

    return deconflicted;
};

export const tryParse = (parse: any, code: string, id: string) => {
    try {
        return parse(code, { allowReturnOutsideFunction: true });
    } catch (err) {
        err.message += ` in ${id}`;
        throw err;
    }
};

export const hasCjsKeywords = (code: string, ignoreGlobal: boolean) => {
    const firstpass = ignoreGlobal ? firstpassNoGlobal : firstpassGlobal;
    return firstpass.test(code);
};

export const checkEsModule = (parse: any, code: string, id: string) => {
    const ast = tryParse(parse, code, id);

    let isEsModule = false;
    for (const node of ast.body) {
        if (node.type === "ExportDefaultDeclaration")
            return { isEsModule: true, hasDefaultExport: true, ast };
        if (node.type === "ExportNamedDeclaration") {
            isEsModule = true;
            for (const specifier of node.specifiers) {
                if (specifier.exported.name === "default") {
                    return { isEsModule: true, hasDefaultExport: true, ast };
                }
            }
        } else if (importExportDeclaration.test(node.type)) isEsModule = true;
    }

    return { isEsModule, hasDefaultExport: false, ast };
};

export const loadMagicString = () =>
    new Promise(resolve => {
        const script = document.createElement("script");
        script.src =
            "https://unpkg.com/@bloxy/iife-libs@0.0.4/libs/magic-string.js";
        script.setAttribute("data-packager", "true");
        script.onload = resolve;
        document.head.appendChild(script);
    });

export default async function(
    parse: any,
    code: string,
    id: string,
    isEntry: boolean,
    ignoreGlobal: boolean,
    ignoreRequire: Function,
    customNamedExports: any,
    sourceMap: any,
    allowDynamicRequire: any,
    astCache: any
) {
    // @ts-ignore
    if (!window.magicString) {
        await loadMagicString();
    }

    const ast = astCache || tryParse(parse, code, id);
    // @ts-ignore
    const magicString = new window.magicString.default(code);
    const required: any = {};
    const sources: any = [];

    let uid = 0;
    let scope: any = attachScopes(ast, "scope");
    let lexicalDepth = 0;
    let programDepth = 0;
    let shouldWrap = /__esModule/.test(code);

    const uses: any = {
        module: false,
        exports: false,
        global: false,
        require: false
    };
    const globals: any = new Set();
    const HELPERS_NAME = deconflict(scope, globals, "commonjsHelpers");
    const namedExports: any = {};

    function isRequireStatement(node: any) {
        if (!node) return false;
        if (node.type !== "CallExpression") return false;
        if (node.callee.name !== "require" || scope.contains("require"))
            return false;
        // Weird case of require() without arguments
        if (node.arguments.length === 0) return false;
        return true;
    }

    function hasDynamicArguments(node: any) {
        return (
            node.arguments.length > 1 ||
            (node.arguments[0].type !== "Literal" &&
                (node.arguments[0].type !== "TemplateLiteral" ||
                    node.arguments[0].expressions.length > 0))
        );
    }

    function isStaticRequireStatement(node: any) {
        if (!isRequireStatement(node)) return false;
        if (hasDynamicArguments(node)) return false;
        if (ignoreRequire(node.arguments[0].value)) return false;
        return true;
    }

    function getRequireStringArg(node: any) {
        return node.arguments[0].type === "Literal"
            ? node.arguments[0].value
            : node.arguments[0].quasis[0].value.cooked;
    }

    function getRequired(node: any, name?: string) {
        const sourceId = getRequireStringArg(node);
        const existing = required[sourceId];
        // eslint-disable-next-line no-undefined
        if (existing === undefined) {
            if (!name) {
                do {
                    name = `require$$${uid}`;
                    uid += 1;
                } while (scope.contains(name));
            }

            sources.push(sourceId);
            required[sourceId] = {
                source: sourceId,
                name,
                importsDefault: false
            };
        }

        return required[sourceId];
    }

    // do a first pass, see which names are assigned to. This is necessary to prevent
    // illegally replacing `var foo = require('foo')` with `import foo from 'foo'`,
    // where `foo` is later reassigned. (This happens in the wild. CommonJS, sigh)
    const assignedTo = new Set();
    walk(ast, {
        enter(node: any) {
            if (node.type !== "AssignmentExpression") return;
            if (node.left.type === "MemberExpression") return;

            extractAssignedNames(node.left).forEach((name: string) => {
                assignedTo.add(name);
            });
        }
    });

    walk(ast, {
        enter(node: any, parent: any) {
            if (sourceMap) {
                magicString.addSourcemapLocation(node.start);
                magicString.addSourcemapLocation(node.end);
            }

            // skip dead branches
            if (
                parent &&
                (parent.type === "IfStatement" ||
                    parent.type === "ConditionalExpression")
            ) {
                if (node === parent.consequent && isFalsy(parent.test)) {
                    this.skip();
                    return;
                }
                if (node === parent.alternate && isTruthy(parent.test)) {
                    this.skip();
                    return;
                }
            }

            if (node._skip) {
                this.skip();
                return;
            }

            programDepth += 1;

            if (node.scope) ({ scope } = node);
            if (functionType.test(node.type)) lexicalDepth += 1;

            // if toplevel return, we need to wrap it
            if (node.type === "ReturnStatement" && lexicalDepth === 0) {
                shouldWrap = true;
            }

            // rewrite `this` as `commonjsHelpers.commonjsGlobal`
            if (node.type === "ThisExpression" && lexicalDepth === 0) {
                uses.global = true;
                if (!ignoreGlobal)
                    magicString.overwrite(
                        node.start,
                        node.end,
                        `${HELPERS_NAME}.commonjsGlobal`,
                        {
                            storeName: true
                        }
                    );
                return;
            }

            // rewrite `typeof module`, `typeof module.exports` and `typeof exports` (https://github.com/rollup/rollup-plugin-commonjs/issues/151)
            if (node.type === "UnaryExpression" && node.operator === "typeof") {
                const flattened = flatten(node.argument);
                if (!flattened) return;

                if (scope.contains(flattened.name)) return;

                if (
                    flattened.keypath === "module.exports" ||
                    flattened.keypath === "module" ||
                    flattened.keypath === "exports"
                ) {
                    magicString.overwrite(node.start, node.end, `'object'`, {
                        storeName: false
                    });
                }
            }

            // rewrite `require` (if not already handled) `global` and `define`, and handle free references to
            // `module` and `exports` as these mean we need to wrap the module in commonjsHelpers.createCommonjsModule
            if (node.type === "Identifier") {
                if (isReference(node, parent) && !scope.contains(node.name)) {
                    if (node.name in uses) {
                        if (node.name === "require") {
                            if (allowDynamicRequire) return;
                            magicString.overwrite(
                                node.start,
                                node.end,
                                `${HELPERS_NAME}.commonjsRequire`,
                                {
                                    storeName: true
                                }
                            );
                        }

                        uses[node.name] = true;
                        if (node.name === "global" && !ignoreGlobal) {
                            magicString.overwrite(
                                node.start,
                                node.end,
                                `${HELPERS_NAME}.commonjsGlobal`,
                                {
                                    storeName: true
                                }
                            );
                        }

                        // if module or exports are used outside the context of an assignment
                        // expression, we need to wrap the module
                        if (node.name === "module" || node.name === "exports") {
                            shouldWrap = true;
                        }
                    }

                    if (node.name === "define") {
                        magicString.overwrite(
                            node.start,
                            node.end,
                            "undefined",
                            { storeName: true }
                        );
                    }

                    globals.add(node.name);
                }

                return;
            }

            // Is this an assignment to exports or module.exports?
            if (node.type === "AssignmentExpression") {
                if (node.left.type !== "MemberExpression") return;

                const flattened = flatten(node.left);
                if (!flattened) return;

                if (scope.contains(flattened.name)) return;

                const match = exportsPattern.exec(flattened.keypath);
                if (!match || flattened.keypath === "exports") return;

                uses[flattened.name] = true;

                // we're dealing with `module.exports = ...` or `[module.]exports.foo = ...` –
                // if this isn't top-level, we'll need to wrap the module
                if (programDepth > 3) shouldWrap = true;

                node.left._skip = true;

                if (
                    flattened.keypath === "module.exports" &&
                    node.right.type === "ObjectExpression"
                ) {
                    node.right.properties.forEach((prop: any) => {
                        if (
                            prop.computed ||
                            !("key" in prop) ||
                            prop.key.type !== "Identifier"
                        )
                            return;
                        const { name } = prop.key;
                        if (name === makeLegalIdentifier(name))
                            namedExports[name] = true;
                    });
                    return;
                }

                if (match[1]) namedExports[match[1]] = true;
                return;
            }

            // if this is `var x = require('x')`, we can do `import x from 'x'`
            if (
                node.type === "VariableDeclarator" &&
                node.id.type === "Identifier" &&
                isStaticRequireStatement(node.init)
            ) {
                // for now, only do this for top-level requires. maybe fix this in future
                if (scope.parent) return;

                // edge case — CJS allows you to assign to imports. ES doesn't
                if (assignedTo.has(node.id.name)) return;

                const required = getRequired(node.init, node.id.name);
                required.importsDefault = true;

                if (required.name === node.id.name) {
                    node._shouldRemove = true;
                }
            }

            if (!isStaticRequireStatement(node)) return;

            const required = getRequired(node);

            if (parent.type === "ExpressionStatement") {
                // is a bare import, e.g. `require('foo');`
                magicString.remove(parent.start, parent.end);
            } else {
                required.importsDefault = true;
                magicString.overwrite(node.start, node.end, required.name);
            }

            node.callee._skip = true;
        },

        leave(node: any) {
            programDepth -= 1;
            if (node.scope) scope = scope.parent;
            if (functionType.test(node.type)) lexicalDepth -= 1;

            if (node.type === "VariableDeclaration") {
                let keepDeclaration = false;
                let c = node.declarations[0].start;

                for (let i = 0; i < node.declarations.length; i += 1) {
                    const declarator = node.declarations[i];

                    if (declarator._shouldRemove) {
                        magicString.remove(c, declarator.end);
                    } else {
                        if (!keepDeclaration) {
                            magicString.remove(c, declarator.start);
                            keepDeclaration = true;
                        }

                        c = declarator.end;
                    }
                }

                if (!keepDeclaration) {
                    magicString.remove(node.start, node.end);
                }
            }
        }
    });

    if (
        !sources.length &&
        !uses.module &&
        !uses.exports &&
        !uses.require &&
        (ignoreGlobal || !uses.global)
    ) {
        if (Object.keys(namedExports).length) {
            throw new Error(
                `Custom named exports were specified for ${id} but it does not appear to be a CommonJS module`
            );
        }
        // not a CommonJS module
        return null;
    }

    const includeHelpers = shouldWrap || uses.global || uses.require;
    const importBlock = `${(includeHelpers
        ? [`import * as ${HELPERS_NAME} from '${HELPERS_ID}';`]
        : []
    )
        .concat(
            sources.map(
                (source: string) =>
                    // import the actual module before the proxy, so that we know
                    // what kind of proxy to build
                    `import '${source}';`
            ),
            sources.map((source: string) => {
                const { name, importsDefault } = required[source];
                return `import ${
                    importsDefault ? `${name} from ` : ``
                }'${getProxyId(source)}';`;
            })
        )
        .join("\n")}\n\n`;

    const namedExportDeclarations = [];
    let wrapperStart = "";
    let wrapperEnd = "";

    const moduleName = deconflict(scope, globals, getName(id));
    if (!isEntry) {
        const exportModuleExports = {
            str: `export { ${moduleName} as __moduleExports };`,
            name: "__moduleExports"
        };

        namedExportDeclarations.push(exportModuleExports);
    }

    const name = getName(id);

    function addExport(x: string) {
        const deconflicted = deconflict(scope, globals, name);

        const declaration =
            deconflicted === name
                ? `export var ${x} = ${moduleName}.${x};`
                : `var ${deconflicted} = ${moduleName}.${x};\nexport { ${deconflicted} as ${x} };`;

        namedExportDeclarations.push({
            str: declaration,
            name: x
        });
    }

    if (customNamedExports) customNamedExports.forEach(addExport);

    const defaultExportPropertyAssignments: any = [];
    let hasDefaultExport = false;

    if (shouldWrap) {
        const args = `module${uses.exports ? ", exports" : ""}`;

        wrapperStart = `var ${moduleName} = ${HELPERS_NAME}.createCommonjsModule(function (${args}) {\n`;
        wrapperEnd = `\n});`;
    } else {
        const names: any = [];

        ast.body.forEach((node: any) => {
            if (
                node.type === "ExpressionStatement" &&
                node.expression.type === "AssignmentExpression"
            ) {
                const { left } = node.expression;
                const flattened = flatten(left);

                if (!flattened) return;

                const match = exportsPattern.exec(flattened.keypath);
                if (!match) return;

                if (flattened.keypath === "module.exports") {
                    hasDefaultExport = true;
                    magicString.overwrite(
                        left.start,
                        left.end,
                        `var ${moduleName}`
                    );
                } else {
                    const [, name] = match;
                    const deconflicted = deconflict(scope, globals, name);

                    names.push({ name, deconflicted });

                    magicString.overwrite(
                        node.start,
                        left.end,
                        `var ${deconflicted}`
                    );

                    const declaration =
                        name === deconflicted
                            ? `export { ${name} };`
                            : `export { ${deconflicted} as ${name} };`;

                    if (name !== "default") {
                        namedExportDeclarations.push({
                            str: declaration,
                            name
                        });
                        delete namedExports[name];
                    }

                    defaultExportPropertyAssignments.push(
                        `${moduleName}.${name} = ${deconflicted};`
                    );
                }
            }
        });

        if (!hasDefaultExport && (names.length || !isEntry)) {
            wrapperEnd = `\n\nvar ${moduleName} = {\n${names
                .map(
                    ({ name, deconflicted }: any) =>
                        `\t${name}: ${deconflicted}`
                )
                .join(",\n")}\n};`;
        }
    }

    Object.keys(namedExports)
        .filter(key => !blacklist[key])
        .forEach(addExport);

    const isIifeOrUmd = /__esModule/.test(code);
    const defaultExport = isIifeOrUmd
        ? `export default ${HELPERS_NAME}.unwrapExports(${moduleName});`
        : `export default ${moduleName};`;

    const named = namedExportDeclarations
        .filter(x => x.name !== "default" || !hasDefaultExport)
        .map(x => x.str);

    const exportBlock = `\n\n window.__dependencies['${id}'] = ${moduleName}; ${[
        defaultExport
    ]
        .concat(named)
        .concat(hasDefaultExport ? defaultExportPropertyAssignments : [])
        .join("\n")}`;

    magicString
        .trim()
        .prepend(importBlock + wrapperStart)
        .trim()
        .append(wrapperEnd);

    if (hasDefaultExport || named.length > 0 || shouldWrap || !isEntry) {
        magicString.append(exportBlock);
    }

    code = magicString.toString();
    const map = sourceMap ? magicString.generateMap() : null;

    return { code, map };
}
