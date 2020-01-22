declare var VueTemplateCompiler: any;
declare var VueDOMCompiler: any;
declare var buble: any;
declare var hashSum: any;

if (!self.VueTemplateCompiler) {
    self.importScripts(
        "https://unpkg.com/vue-template-compiler@latest/browser.js"
    );
}

if (!self.VueDOMCompiler) {
    self.importScripts(
        "https://cdn.jsdelivr.net/npm/vue-next@0.0.1/packages/compiler-dom/dist/compiler-dom.global.prod.js"
    );
}

if (!self.buble) {
    self.importScripts(
        "https://unpkg.com/vue-template-es2015-compiler@1.9.1/buble.js"
        // "https://cdn.jsdelivr.net/npm/buble@latest/dist/buble-browser-deps.umd.min.js"
    );
}

if (!self.hashSum) {
    self.importScripts(
        "https://unpkg.com/hash-sum-browser@latest/dist/index.min.js"
    );
}

self.addEventListener("message", async ({ data }) => {
    const { file, type } = data;
    if (type === "transpiler--prepare-file") {
        const code = prepareFile(file);
        console.log(code);
        self.postMessage({
            success: true,
            type: "worker--transpiled-file",
            file: {
                ...file,
                code
            }
        });
    }
});

const prepareFile = (file: any) => {
    const { template, script } = self.VueTemplateCompiler.parseComponent(
        file.code
    );

    const scopeId = `data-v-${hashSum(file.path)}`;

    return compileTemplate(script.content, template, scopeId);
};

/**
 * Compiled the template using vue-template-compiler
 * and creates an object later to be used by SystemJS to render
 * the template.
 */
const compileTemplate = (content, template, scopeId) => {
    const {
        render,
        staticRenderFns
    } = self.VueTemplateCompiler.compileToFunctions(template.content);

    content = insertTemplateInExport(content, template.content, scopeId);

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
const toFn = code =>
    self.buble
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
const insertTemplateInExport = (content, template, scopeId, scoped = false) => {
    const exportRegex = /^export default.*/gm;
    if (exportRegex.test(content)) {
        const insideExport = /\{(.*)\}/gms.exec(content);
        const _template = "`" + template + "`";
        content = `export default {
            template: ${_template},
            render: __renderFns__.render,
            staticRenderFns: __renderFns__.staticRenderFns, 
            ${scoped ? `_scoped:"` + scopeId + `",` : ""}
            ${insideExport[1]} }`;
    }

    return content;
};
