import { PluginContext as RollupPluginContext } from "rollup";
import { RootNode } from "packager-pluginutils";
import getAllImportsExports from "./get-all-imports-exports";
import findMissingImports from "./find-missing-imports";
// @ts-ignore
// import { init, parse } from "es-module-lexer/dist/lexer.js";

/**
 * Override transformed code of an external module to include a "window" export
 * which is for caching the module in the browser context.
 *
 * @todo What needs to be done:
 * 1. Find all of the default and named exports.
 * 2. See if any of those exports are exported using the syntax: export { XYZ } from ...
 *    or export { XYZ as default } from ...
 *    2a. if there are any, we will need to change this to an import because if we don't
 *        the named exports will not be able to be used in window.__PACKAGER_CONTEXT__...
 *        Even if there are more than 1 export for the same file, we only want to add/modify
 *        1 import statement. Preferably the first one. This import statement has to be above
 *        the export statement.
 *        2aa. We will have to check whether there already is an import for that particular
 *             exported file. If there is, we need to find the first one and add the imports
 *             so that they become available. If we have an exported default, we will need to
 *             do an "import ALL, { XYZ... } from ...".
 *
 * @todo figure out a way to group the imports by source so that
 * we can only have 1 import (2 at most with namespaced import).
 *
 * Actions:
 * 1. Get the AST from the code to be "walk" through it.
 * 2. Get all imports and exports.
 * 3. Find which exports are missing imports
 * 4. Go through the missing imports and append them to the code.
 * 5. Add the __PACKAGER_CONTEXT__ to the code
 */
export default async function (
  moduleId: string,
  code: string,
  rollupPluginContext: RollupPluginContext
) {
  const rootNode = rollupPluginContext.parse(code, {}) as RootNode;
  const { imports, exports } = getAllImportsExports(rootNode, code);
  const { default: missingDefault, named, namespaced } = findMissingImports(
    imports,
    exports
  );

  // Append default import statement
  for (const missing of missingDefault) {
    code = `import ${missing.import} from "${missing.source}";\n\n ${code}`;
  }

  // Append named import statement
  for (const missing of named) {
    const inlined = Object.keys(missing.imports)
      .map((_import) => {
        if (_import === missing.imports[_import]) {
          return _import;
        }

        return `${_import}: ${missing.imports[_import]}`;
      })
      .join(", ");

    code = `import { ${inlined} } from "${missing.source}";\n\n ${code}`;
  }

  for (const missing of namespaced) {
    code = `import * as ${missing.import} from "${missing.source}";\n\n ${code}`;
  }

  const packagerContextExports = [];

  if (exports?.default?.export) {
    packagerContextExports.push(`default: ${exports.default.export}`);
  }

  // named exports with sources
  for (const named of exports.named) {
    const onlyExportsWithSources = Object.keys(named.exports)
      .map((_exportKey) => {
        if (!named.source) {
          return null;
        }

        const exportValue = named.exports[_exportKey];
        if (exportValue === exports?.default?.export) {
          return packagerContextExports.find(
            (_export) => !_export.startsWith("default:")
          )
            ? `default: ${exportValue}`
            : null;
        }

        if (_exportKey === "default") {
          return exportValue;
        }

        if (_exportKey === exportValue) {
          return exportValue;
        }

        return `${_exportKey}: ${exportValue}`;
      })
      .filter(Boolean);

    packagerContextExports.push(onlyExportsWithSources);
  }

  for (const allImport of namespaced) {
    packagerContextExports.push(`...${allImport.import}`);
  }

  return `${code} \n\n window.__PACKAGER_CONTEXT__.npmDependencies['${moduleId}'] = { ${packagerContextExports.join(
    ", "
  )} }`;
}
