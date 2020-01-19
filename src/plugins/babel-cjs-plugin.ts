/**
 * This is a modified version of babel-plugin-transform-commonjs to work
 * with @bloxy (https://github.com/bloxy).
 *
 * Special thanks to @tbranyen (https://github.com/tbranyen)
 * for his work on the original plugin (https://github.com/tbranyen/babel-plugin-transform-commonjs).
 */
export default function(babelTypes: any) {
    const options: any = {};
    const state = {
        globals: new Set(),
        renamed: new Map(),
        identifiers: new Set(),
        isCJS: false
    };
    const enter = (path: any) => {
        let cursor = path;
        // Find the closest function scope or parent.
        do {
            // Ignore block statements.
            if (babelTypes.isBlockStatement(cursor.scope.path)) {
                continue;
            }
            if (
                babelTypes.isFunction(cursor.scope.path) ||
                babelTypes.isProgram(cursor.scope.path)
            ) {
                break;
            }
        } while ((cursor = cursor.scope.path.parentPath));
        if (babelTypes.isProgram(cursor.scope.path)) {
            const nodes: any = [];
            const inner: any = [];
            // Break up the program, separate Nodes added by us from the nodes
            // created by the user.
            cursor.scope.path.node.body.filter((node: any) => {
                // Keep replaced nodes together, these will not be wrapped.
                if (node.__replaced) {
                    nodes.push(node);
                } else {
                    inner.push(node);
                }
            });
            const program = babelTypes.program([
                ...nodes,
                babelTypes.expressionStatement(
                    babelTypes.callExpression(
                        babelTypes.memberExpression(
                            babelTypes.functionExpression(
                                null,
                                [],
                                babelTypes.blockStatement(inner)
                            ),
                            babelTypes.identifier("call")
                        ),
                        [babelTypes.identifier("module.exports")]
                    )
                )
            ]);
            cursor.scope.path.replaceWith(program);
            state.isCJS = true;
        }
    };
    return {
        post() {
            state.globals.clear();
            state.renamed.clear();
            state.identifiers.clear();
            state.isCJS = false;
        },
        visitor: {
            Program: {
                exit(path: any) {
                    path.traverse({
                        CallExpression: {
                            exit(path: any) {
                                const { node } = path;
                                // Look for `require()` any renaming is assumed to be intentionally
                                // done to break state kind of check, so we won't look for aliases.
                                if (
                                    !options.exportsOnly &&
                                    babelTypes.isIdentifier(node.callee) &&
                                    node.callee.name === "require"
                                ) {
                                    // Require must be global for us to consider this a CommonJS
                                    // module.
                                    state.isCJS = true;
                                    // Check for nested string and template literals.
                                    const isString = babelTypes.isStringLiteral(
                                        node.arguments[0]
                                    );
                                    const isLiteral = babelTypes.isTemplateLiteral(
                                        node.arguments[0]
                                    );
                                    // Normalize the string value, default to the standard string
                                    // literal format of `{ value: "" }`.
                                    let str = null;
                                    if (isString) {
                                        str = node.arguments[0];
                                    } else if (isLiteral) {
                                        str = {
                                            value:
                                                node.arguments[0].quasis[0]
                                                    .value.raw
                                        };
                                    } else if (options.synchronousImport) {
                                        const str = node.arguments[0];
                                        const newNode = babelTypes.expressionStatement(
                                            babelTypes.callExpression(
                                                babelTypes.import(),
                                                [str]
                                            )
                                        );
                                        // @ts-ignore
                                        newNode.__replaced = true;
                                        path.replaceWith(newNode);
                                        return;
                                    } else {
                                        throw new Error(
                                            `Invalid require signature: ${path.toString()}`
                                        );
                                    }
                                    const specifiers: any = [];
                                    // Convert to named import.
                                    if (
                                        babelTypes.isObjectPattern(
                                            path.parentPath.node.id
                                        )
                                    ) {
                                        path.parentPath.node.id.properties.forEach(
                                            (prop: any) => {
                                                specifiers.push(
                                                    babelTypes.importSpecifier(
                                                        prop.value,
                                                        prop.key
                                                    )
                                                );
                                                state.globals.add(
                                                    prop.value.name
                                                );
                                            }
                                        );
                                        const decl = babelTypes.importDeclaration(
                                            specifiers,
                                            babelTypes.stringLiteral(str.value)
                                        );
                                        // @ts-ignore
                                        decl.__replaced = true;
                                        path.scope
                                            .getProgramParent()
                                            .path.unshiftContainer(
                                                "body",
                                                decl
                                            );
                                        path.parentPath.remove();
                                    }
                                    // Convert to default import.
                                    else if (str) {
                                        const { parentPath } = path;
                                        const { left } = parentPath.node;
                                        // @ts-ignore
                                        const oldId = !babelTypes.isMemberExpression(
                                            left
                                        )
                                            ? left
                                            : left.id;
                                        // Default to the closest likely identifier.
                                        let id = oldId;
                                        // If we can't find an id, generate one from the import path.
                                        if (
                                            !oldId ||
                                            !babelTypes.isProgram(
                                                parentPath.scope.path.type
                                            )
                                        ) {
                                            id = path.scope.generateUidIdentifier(
                                                str.value
                                            );
                                        }
                                        // Add state global name to the list.
                                        state.globals.add(id.name);
                                        // Create an import declaration.
                                        const decl = babelTypes.importDeclaration(
                                            [
                                                babelTypes.importDefaultSpecifier(
                                                    id
                                                )
                                            ],
                                            babelTypes.stringLiteral(str.value)
                                        );
                                        // @ts-ignore
                                        decl.__replaced = true;
                                        // Push the declaration in the root scope.
                                        path.scope
                                            .getProgramParent()
                                            .path.unshiftContainer(
                                                "body",
                                                decl
                                            );
                                        // If we needed to generate or the change the id, then make an
                                        // assignment so the values stay in sync.
                                        if (
                                            oldId &&
                                            !babelTypes.isNodesEquivalent(
                                                oldId,
                                                id
                                            )
                                        ) {
                                            const newNode = babelTypes.expressionStatement(
                                                babelTypes.assignmentExpression(
                                                    "=",
                                                    oldId,
                                                    id
                                                )
                                            );
                                            // @ts-ignore
                                            newNode.__replaced = true;
                                            path.parentPath.parentPath.replaceWith(
                                                newNode
                                            );
                                        }
                                        // If we generated a new identifier for state, replace the inline
                                        // call with the variable.
                                        else if (!oldId) {
                                            path.replaceWith(id);
                                        }
                                        // Otherwise completely remove.
                                        else {
                                            path.parentPath.remove();
                                        }
                                    }
                                }
                            }
                        }
                    });
                    const programPath = path.scope.getProgramParent().path;
                    // Even though we are pretty sure this isn't a CommonJS file, lets
                    // do one last sanity check for an `import` or `export` in the
                    // program path.
                    if (!state.isCJS) {
                        const lastImport = programPath
                            .get("body")
                            .filter((p: any) => p.isImportDeclaration())
                            .pop();
                        const lastExport = programPath
                            .get("body")
                            .filter((p: any) => p.isExportDeclaration())
                            .pop();
                        // Maybe it is a CJS file after-all.
                        if (!lastImport && !lastExport) {
                            state.isCJS = true;
                        }
                    }
                    if (path.node.__replaced || !state.isCJS) {
                        return;
                    }
                    // @ts-ignore
                    const moduleId = this.file.opts.moduleId;
                    const preDependencyAlias = babelTypes.variableDeclarator(
                        babelTypes.identifier(
                            "window.__dependencies = { ...window.__dependencies || {} };"
                        )
                    );
                    const exportsAlias = babelTypes.variableDeclaration("var", [
                        babelTypes.variableDeclarator(
                            babelTypes.identifier("exports"),
                            babelTypes.memberExpression(
                                babelTypes.identifier("module"),
                                babelTypes.identifier("exports")
                            )
                        )
                    ]);
                    const moduleExportsAlias = babelTypes.variableDeclaration(
                        "var",
                        [
                            babelTypes.variableDeclarator(
                                babelTypes.identifier("module"),
                                babelTypes.objectExpression([
                                    babelTypes.objectProperty(
                                        babelTypes.identifier("exports"),
                                        babelTypes.objectExpression([])
                                    )
                                ])
                            )
                        ]
                    );
                    const dependencyAliasFromExports = babelTypes.variableDeclarator(
                        babelTypes.identifier(
                            `window.__dependencies['${moduleId}'] = module.exports;`
                        )
                    );
                    // @ts-ignore
                    exportsAlias.__replaced = true;
                    // @ts-ignore
                    moduleExportsAlias.__replaced = true;
                    // Add the `module` and `exports` globals into the program body,
                    // after the last `import` declaration.
                    const lastImport = programPath
                        .get("body")
                        .filter((p: any) => p.isImportDeclaration())
                        .pop();
                    if (lastImport) {
                        lastImport.insertAfter(preDependencyAlias);
                        lastImport.insertAfter(exportsAlias);
                        lastImport.insertAfter(moduleExportsAlias);
                    } else {
                        programPath.unshiftContainer(
                            "body",
                            preDependencyAlias
                        );
                        programPath.unshiftContainer("body", exportsAlias);
                        programPath.unshiftContainer(
                            "body",
                            moduleExportsAlias
                        );
                    }
                    const defaultExport = babelTypes.exportDefaultDeclaration(
                        babelTypes.memberExpression(
                            babelTypes.identifier("module"),
                            babelTypes.identifier("exports")
                        )
                    );
                    path.node.__replaced = true;
                    // @ts-ignore
                    defaultExport.__replaced = true;
                    programPath.pushContainer(
                        "body",
                        dependencyAliasFromExports
                    );
                }
            },
            ThisExpression: { enter },
            ReturnStatement: { enter },
            ImportSpecifier: {
                enter(path: any) {
                    const { name } = path.node.local;
                    // If state import was renamed, ensure the source reflects it.
                    if (state.renamed.has(name)) {
                        const oldName = babelTypes.identifier(name);
                        const newName = babelTypes.identifier(
                            state.renamed.get(name)
                        );
                        path.replaceWith(
                            babelTypes.importSpecifier(newName, oldName)
                        );
                    }
                }
            },
            AssignmentExpression: {
                enter(path: any) {
                    if (path.node.__ignore) {
                        return;
                    }
                    path.node.__ignore = true;
                    // Check for module.exports.
                    if (babelTypes.isMemberExpression(path.node.left)) {
                        const moduleBinding = path.scope.getBinding("module");
                        const exportsBinding = path.scope.getBinding("exports");
                        // Something like `module.exports.namedExport = true;`.
                        if (
                            babelTypes.isMemberExpression(
                                path.node.left.object
                            ) &&
                            path.node.left.object.object.name === "module"
                        ) {
                            if (!moduleBinding) {
                                state.isCJS = true;
                                return;
                            }
                        } else if (
                            babelTypes.isIdentifier(path.node.left.object) &&
                            path.node.left.object.name === "module"
                        ) {
                            if (!moduleBinding) {
                                state.isCJS = true;
                                // Looking at a re-exports, handled above.
                                if (
                                    babelTypes.isCallExpression(path.node.right)
                                ) {
                                    return;
                                }
                            }
                        }
                        // Check for regular exports
                        else if (path.node.left.object.name === "exports") {
                            const { name } = path.node.left.property;
                            if (
                                exportsBinding ||
                                // If export is named "default" leave as is.
                                // It is not possible to export "default" as a named export.
                                // e.g. `export.default = 'a'`
                                name === "default"
                            ) {
                                return;
                            }
                            state.isCJS = true;
                            let prop = path.node.right;
                            if (
                                (path.scope
                                    .getProgramParent()
                                    .hasBinding(prop.name) ||
                                    state.globals.has(prop.name)) &&
                                // Don't rename `undefined`.
                                prop.name !== "undefined"
                            ) {
                                prop = path.scope.generateUidIdentifier(
                                    prop.name
                                );
                                const oldName = path.node.right.name;
                                state.renamed.set(oldName, prop.name);
                                // Add this new identifier into the globals and replace the
                                // right hand side with this replacement.
                                state.globals.add(prop.name);
                                path.get("right").replaceWith(prop);
                                path.scope.rename(oldName, prop.name);
                            }
                            // If we set an invalid name, then abort out.
                            try {
                                // Ensure that the scope is clean before we inject new,
                                // potentially conflicting, variables.
                                const newName = path.scope.generateUidIdentifier(
                                    name
                                ).name;
                                path.scope.rename(name, newName);
                                const decl = babelTypes.exportNamedDeclaration(
                                    babelTypes.variableDeclaration("let", [
                                        babelTypes.variableDeclarator(
                                            path.node.left.property,
                                            babelTypes.memberExpression(
                                                babelTypes.identifier(
                                                    "exports"
                                                ),
                                                path.node.left.property
                                            )
                                        )
                                    ]),
                                    []
                                );
                                if (!state.identifiers.has(name)) {
                                    path.scope
                                        .getProgramParent()
                                        .path.pushContainer("body", decl);
                                    state.identifiers.add(name);
                                }
                            } catch (_a) {}
                        }
                    }
                }
            }
        }
    };
}
