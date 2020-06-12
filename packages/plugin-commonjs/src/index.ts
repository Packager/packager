import { createPlugin, verifyExtensions } from "packager-pluginutils";
import resolver from "./resolver";
// import loader from "./loader";
// @ts-ignore
import Worker from "web-worker:./worker";

import {
  normalizePathSlashes,
  getIdFromProxyId,
  getIdFromExternalProxyId,
  getVirtualPathForDynamicRequirePath,
  HELPERS,
  HELPER_NON_DYNAMIC,
  HELPERS_ID,
  DYNAMIC_PACKAGES_ID,
  EXTERNAL_SUFFIX,
  DYNAMIC_JSON_PREFIX,
  PROXY_SUFFIX,
  hasCjsKeywords,
} from "./utils/helpers";

import getName from "./utils/get-name";
import checkEsModule from "./utils/check-es-module";
import { getIsCjsPromise, setIsCjsPromise } from "./utils/is-cjs";
import { transformCommonjs } from "./utils/transform";

const esModulesWithoutDefaultExport = new Set();
const esModulesWithDefaultExport = new Set();

const options = {
  transformMixedEsModules: true,
  ignoreGlobal: true,
  ignoreRequire: false,
  sourceMap: true,
};

const isValid = verifyExtensions([".js"]);

function transformAndCheckExports(code, id) {
  const { isEsModule, hasDefaultExport, ast } = checkEsModule(
    this.parse,
    code,
    id
  );

  if (isEsModule && options.transformMixedEsModules) {
    (hasDefaultExport
      ? esModulesWithDefaultExport
      : esModulesWithoutDefaultExport
    ).add(id);
  }
  // it is not an ES module AND it does not have CJS-specific elements.
  else if (!hasCjsKeywords(code, options.ignoreGlobal)) {
    esModulesWithoutDefaultExport.add(id);
    setIsCjsPromise(id, false);
    return null;
  }

  const moduleInfo = this.getModuleInfo(id);

  const transformed = transformCommonjs(
    this.parse,
    code,
    id,
    moduleInfo.isEntry,
    moduleInfo.importers && moduleInfo.importers.length > 0,
    isEsModule,
    options.ignoreGlobal || isEsModule,
    options.ignoreRequire,
    options.sourceMap,
    ast
  );

  setIsCjsPromise(id, isEsModule ? false : Boolean(transformed));

  if (!transformed) {
    if (!isEsModule) esModulesWithoutDefaultExport.add(id);
    return null;
  }

  return transformed;
}

const commonjsPlugin = createPlugin({
  name: "commonjs",
  extensions: [".js"],
  resolver,
  loader(moduleId: string) {
    if (moduleId === HELPERS_ID) {
      return HELPERS + HELPER_NON_DYNAMIC;
    }

    // generate proxy modules
    if (moduleId.endsWith(EXTERNAL_SUFFIX)) {
      const actualId = getIdFromExternalProxyId(moduleId);
      const name = getName(actualId);

      if (actualId === HELPERS_ID || actualId === DYNAMIC_PACKAGES_ID)
        // These do not export default
        return `import * as ${name} from ${JSON.stringify(
          actualId
        )}; export default ${name};`;

      return `import ${name} from ${JSON.stringify(
        actualId
      )}; export default ${name};`;
    }

    let actualId = moduleId;

    const isDynamicJson = actualId.startsWith(DYNAMIC_JSON_PREFIX);
    if (isDynamicJson) {
      actualId = actualId.slice(DYNAMIC_JSON_PREFIX.length);
    }

    const normalizedPath = normalizePathSlashes(actualId);

    if (isDynamicJson) {
      return `require('${HELPERS_ID}').commonjsRegister(${JSON.stringify(
        getVirtualPathForDynamicRequirePath(normalizedPath, null)
      )}, function (module, exports) {
  module.exports = require(${JSON.stringify(normalizedPath)});
  });`;
    }

    if (actualId.endsWith(PROXY_SUFFIX)) {
      actualId = getIdFromProxyId(actualId);
      const name = getName(actualId);

      return getIsCjsPromise(actualId).then((isCjs) => {
        if (isCjs)
          return `import { __moduleExports } from ${JSON.stringify(
            actualId
          )}; export default __moduleExports;`;
        else if (esModulesWithoutDefaultExport.has(actualId))
          return `import * as ${name} from ${JSON.stringify(
            actualId
          )}; export default ${name};`;
        else if (esModulesWithDefaultExport.has(actualId)) {
          return `export {default} from ${JSON.stringify(actualId)};`;
        }
        return `import * as ${name} from ${JSON.stringify(
          actualId
        )}; import {getCjsExportFromNamespace} from "${HELPERS_ID}"; export default getCjsExportFromNamespace(${name})`;
      });
    }

    return null;
  },
  beforeBundle(code: string, moduleId: string) {
    if (
      moduleId !== DYNAMIC_PACKAGES_ID &&
      !moduleId.startsWith(DYNAMIC_JSON_PREFIX)
    ) {
      if (!isValid(moduleId)) {
        setIsCjsPromise(moduleId, null);
        return null;
      }
    }

    let transformed;
    try {
      transformed = transformAndCheckExports.call(this, code, moduleId);
    } catch (err) {
      transformed = null;
      setIsCjsPromise(moduleId, false);
      this.error(err, err.loc);
    }

    if (transformed) {
      return transformed.code;
    }

    return null;
  },
});

export default commonjsPlugin;
