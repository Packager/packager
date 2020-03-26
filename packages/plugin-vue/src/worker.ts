import { TRANSPILE_STATUS } from "packager";
import { stylePluginHelpers, generateSourceMap } from "packager-shared";

declare global {
  interface Window {
    VueTemplateCompiler: any;
    buble: any;
    hashSum: any;
    css: any;
    postcssSelectorParser: any;
  }
}

const loadTemplateCompiler = () => {
  if (!self.VueTemplateCompiler) {
    self.importScripts(
      "https://cdn.jsdelivr.net/npm/vue-template-compiler/browser.js"
    );
  }
};

const loadBuble = () => {
  if (!self.buble) {
    self.importScripts(
      "https://cdn.jsdelivr.net/npm/@bloxy/iife-libs@latest/libs/buble.js"
    );
  }
};

const loadHashSum = () => {
  if (!self.hashSum) {
    self.importScripts(
      "https://cdn.jsdelivr.net/npm/hash-sum-browser/dist/index.min.js"
    );
  }
};

const loadCss = () => {
  if (!self.css) {
    self.importScripts(
      "https://cdn.jsdelivr.net/npm/@bloxy/iife-libs@latest/libs/css.js"
    );
  }
};

const loadPostcssSelectorParser = () => {
  if (!self.postcssSelectorParser) {
    self.importScripts(
      "https://cdn.jsdelivr.net/npm/@bloxy/iife-libs@latest/libs/postcss-selector-parser.js"
    );
  }
};

const loadAllLibs = () => {
  loadTemplateCompiler();
  loadBuble();
  loadHashSum();
  loadCss();
  loadPostcssSelectorParser();
};

loadAllLibs();

self.addEventListener("message", async ({ data }: any) => {
  loadAllLibs();

  const { file, type, context, additional } = data;
  if (type === TRANSPILE_STATUS.PREPARE_FILES) {
    try {
      if (!file || !file.path)
        throw new Error("File isn't supplied or it has an incorrect format.");

      const { styles, script, html } = prepareFileAndCompileTemplate(file);

      if ((styles || html) && (styles.length || html.length)) {
        const additional = { styles, html };

        self.postMessage({
          type: TRANSPILE_STATUS.PREPARE_ADDITIONAL,
          file: { ...file, code: script },
          additional
        });
      } else {
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
      self.postMessage({
        type: TRANSPILE_STATUS.ERROR_COMPILE,
        error
      });
    }
  }

  if (type === TRANSPILE_STATUS.ADDITIONAL_TRANSPILED) {
    let code = file.code;
    if (additional) {
      try {
        console.log(additional);
        // append the style injector here
        // do something with html stuff here like vue pug. but later.
        // code + styles
        code += appendStyles(additional.styles, file.path);

        self.postMessage({
          type: TRANSPILE_STATUS.TRANSPILE_COMPLETE,
          file: {
            ...file,
            code,
            map: generateSourceMap(file.path, file.code, code)
          }
        });
      } catch (error) {
        self.postMessage({
          type: TRANSPILE_STATUS.ERROR_ADDITIONAL,
          error
        });
      }
    }
  }
});

const prepareFileAndCompileTemplate = (file: any) => {
  const {
    template,
    script,
    styles
  } = self.VueTemplateCompiler.parseComponent(file.code, { pad: "line" });

  const scopeId = `data-v-${self.hashSum(file.path)}`;
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
    extension: style.lang || "css",
    scopeId: style.scoped ? scopeId : null,
    path: file.path,
    name: file.name
  }));

const appendStyles = (styles: any[], filePath: string) => {
  const parsedStyles = [];
  for (const style of styles) {
    parsedStyles.push(parseCssStyle(style.code, style.scopeId));
  }

  return stylePluginHelpers.generateExportsForAllStyles(parsedStyles, filePath);
};

const parseCssStyle = (code: string, scopeId: string = "") => {
  const parsed = self.css.parse(code);
  return self.css.stringify({
    ...parsed,
    stylesheet: applyAttributeToSelector(parsed.stylesheet, scopeId)
  });
};

const applyAttributeToSelector = (tree: any, scopeId: string) => {
  if ("selectors" in tree) {
    for (const i in tree.selectors) {
      const selector = tree.selectors[i];
      tree.selectors[i] = self
        .postcssSelectorParser((selectors: any) => {
          selectors.each((selector: any) => {
            let node = null;
            selector.each((n: any) => {
              if (n.type !== "pseudo") node = n;
            });
            if (scopeId && scopeId != "") {
              selector.insertAfter(
                node,
                self.postcssSelectorParser.attribute({
                  attribute: scopeId
                })
              );
            }
          });
        })
        .processSync(selector);
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
  const {
    render,
    staticRenderFns
  } = self.VueTemplateCompiler.compileToFunctions(template.content);

  content = insertTemplateInExport(content, template.content, scopeId, scoped);

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
