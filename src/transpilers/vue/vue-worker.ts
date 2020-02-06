import { generateExportsForAllStyles } from "../../utils/style-plugin-helpers";
import { TRANSPILE_STATUS } from "../transpiler";
import "../source-maps";

declare var VueTemplateCompiler: any;
declare var buble: any;
declare var hashSum: any;
declare var css: any;
declare var postcssSelectorParser: any;
declare var generateSourceMap: any;

self.importScripts(
    "https://unpkg.com/vue-template-compiler/browser.js",
    "https://unpkg.com/hash-sum-browser/dist/index.min.js",
    "https://unpkg.com/@bloxy/iife-libs/libs/buble.js",
    "https://unpkg.com/@bloxy/iife-libs/libs/css.js",
    "https://unpkg.com/@bloxy/iife-libs/libs/postcss-selector-parser.js"
);

self.addEventListener("message", async ({ data }: any) => {
    const { file, type, additional } = data;

    if (type === TRANSPILE_STATUS.PREPARE_FILES) {
        try {
            if (!file || !file.path)
                throw new Error(
                    "File isn't supplied or it has an incorrect format."
                );

            const { styles, script, html } = prepareFileAndCompileTemplate(
                file
            );

            if ((styles || html) && (styles.length || html.length)) {
                const additional = { styles, html };

                // @ts-ignore wrong scope
                self.postMessage({
                    type: TRANSPILE_STATUS.PREPARE_ADDITIONAL,
                    file: { ...file, code: script },
                    additional
                });
            } else {
                // @ts-ignore wrong scope
                self.postMessage({
                    type: TRANSPILE_STATUS.TRANSPILE_COMPLETE,
                    file: {
                        ...file,
                        code: script,
                        map: generateSourceMap(file.path, file.code, script)
                    }
                });
            }
        } catch (error) {
            // @ts-ignore wrong scope
            self.postMessage({
                type: TRANSPILE_STATUS.ERROR_PREPARING_AND_COMPILING,
                error
            });
        }

        return;
    }

    if (type === TRANSPILE_STATUS.ADDITIONAL_TRANSPILED) {
        let code = file.code;
        if (additional) {
            try {
                // append the style injector here
                // do something with html stuff here like vue pug. but later.
                // code + styles
                code += appendStyles(additional.styles, file.path);
            } catch (error) {
                // @ts-ignore wrong scope
                self.postMessage({
                    type: TRANSPILE_STATUS.ERROR_ADDITIONAL,
                    error
                });

                return;
            }
        }

        // @ts-ignore wrong scope
        self.postMessage({
            type: TRANSPILE_STATUS.TRANSPILE_COMPLETE,
            file: {
                ...file,
                code,
                map: generateSourceMap(file.path, file.code, code)
            }
        });

        return;
    }
});

const prepareFileAndCompileTemplate = (file: any) => {
    const {
        template,
        script,
        styles
    } = VueTemplateCompiler.parseComponent(file.code, { pad: "line" });

    const scopeId = `data-v-${hashSum(file.path)}`;
    const scoped = styles.some((style: any) => style.scoped === true);

    return {
        styles: prepareStyles(styles, scoped ? scopeId : null, file),
        html: [],
        script: compileTemplate(script.content, template, scopeId, scoped)
    };
};

type Style = {
    content: string;
    type: string;
    lang?: string;
    scoped?: boolean;
    attrs: { [key: string]: string };
    start: number;
    end: number;
};

const prepareStyles = (
    styles: Style[] = [],
    scopeId: string | null,
    file: any
) =>
    styles.map(style => ({
        code: style.content,
        lang: style.lang || "css",
        scopeId: style.scoped ? scopeId : null,
        path: file.path
    }));

const appendStyles = (styles: any[], filePath: string) => {
    const parsedStyles = [];
    for (const style of styles) {
        parsedStyles.push(parseCssStyle(style.code, style.scopeId));
    }

    return generateExportsForAllStyles(parsedStyles, filePath);
};

const parseCssStyle = (code: string, scopeId: string = "") => {
    const parsed = css.parse(code);
    return css.stringify({
        ...parsed,
        stylesheet: applyAttributeToSelector(parsed.stylesheet, scopeId)
    });
};

const applyAttributeToSelector = (tree: any, scopeId: string) => {
    if ("selectors" in tree) {
        for (const i in tree.selectors) {
            const selector = tree.selectors[i];
            tree.selectors[i] = postcssSelectorParser((selectors: any) => {
                selectors.each((selector: any) => {
                    let node = null;
                    selector.each((n: any) => {
                        if (n.type !== "pseudo") node = n;
                    });
                    if (scopeId && scopeId != "") {
                        selector.insertAfter(
                            node,
                            postcssSelectorParser.attribute({
                                attribute: scopeId
                            })
                        );
                    }
                });
            }).processSync(selector);
        }
    }

    if ("rules" in tree) {
        for (const i in tree.rules) {
            const rule = tree.rules[i];
            tree.rules[i] = applyAttributeToSelector(rule, scopeId);
        }
    }

    return tree;
};

/**
 * Compiled the template using vue-template-compiler
 * and creates an object later to be used by SystemJS to render
 * the template.
 */
const compileTemplate = (
    content: string,
    template: any,
    scopeId: string,
    scoped: boolean
) => {
    const { render, staticRenderFns } = VueTemplateCompiler.compileToFunctions(
        template.content
    );

    content = insertTemplateInExport(
        content,
        template.content,
        scopeId,
        scoped
    );

    return `var __renderFns__ = { 
        render: ${toFn(render)},
        staticRenderFns: [
            ${staticRenderFns.map(toFn).join(",")}
        ] 
    }; ${content}`;
};

/**
 * Transform the given code with buble
 * and put it into a render function for later use.
 *
 * Some weird stuff at the end of this function but
 * that's because the buble.transform returns an
 * anonymous function which messes up the render.
 * So we are essentially removing that function :)
 * @todo find a better way for this. this is horrible.
 */
const toFn = (code: string) =>
    buble
        .transform(`function render () { ${code} }`, {
            objectAssign: "Object.assign",
            transforms: {
                stripWith: true,
                stripWithFunctional: false
            }
        })
        .code.replace(
            `function anonymous(
) {`,
            ""
        )
        .slice(0, -1);

/**
 * Find where the export default is in the code
 * and insert the template property with content.
 */
const insertTemplateInExport = (
    content: string,
    template: string,
    scopeId: string,
    scoped = false
) => {
    const exportRegex = /^export default.*/gm;
    if (exportRegex.test(content)) {
        const insideExport = /\{(.*)\}/gms.exec(content);
        const _template = "`" + template + "`";
        content = `export default {
            template: ${_template},
            render: __renderFns__.render,
            staticRenderFns: __renderFns__.staticRenderFns, 
            ${scoped ? `_scopeId:"` + scopeId + `",` : ""}
            ${insideExport && insideExport.length ? insideExport[1] : ""} }; `;
    }

    return content;
};
