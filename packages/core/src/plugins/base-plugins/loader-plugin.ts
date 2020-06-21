import { createPlugin } from "packager-pluginutils";
import {
  packagerContext,
  isModuleExternal,
  fetchDependency,
  parsePackagePath,
} from "../../utils";
import { reservedWords } from "./utils";
import { IGNORE_CACHED } from "../../proxy-hooks/transformer";

const cleanupExternalDependency = (code: string): string =>
  code.replace(/process.env.NODE_ENV/g, "'development'");

const reserved = reservedWords.split(" ");
const generateExportForCachedPackage = (moduleId: string) => {
  const moduleExports = packagerContext.get("npmDependencies")[moduleId];
  const namedExportKeys = Object.keys(moduleExports);
  let namedExports = "";

  // window.__PACKAGER_CONTEXT__.npmDependencies(moduleId)["default"]
  const defaultExports = namedExportKeys.includes("default")
    ? Object.keys(moduleExports.default)
    : [];
  // everything else but default export
  const otherExports = namedExportKeys.filter((key) => key !== "default");

  const defaultWithoutReserved = defaultExports
    .filter((m) => !reserved.includes(m))
    .map((m) => m);

  const otherWithoutReserved = otherExports
    .filter((m) => !reserved.includes(m) && !defaultWithoutReserved.includes(m))
    .map((m) => m);

  if (defaultWithoutReserved.length) {
    namedExports = `${namedExports} export const { ${defaultWithoutReserved.join(
      ", "
    )} } = __default;`;
  }

  if (otherWithoutReserved.length) {
    namedExports = `${namedExports} export const { ${otherWithoutReserved.join(
      ", "
    )} } = __main;`;
  }

  return `${IGNORE_CACHED} \n\n const __main = window.__PACKAGER_CONTEXT__.npmDependencies['${moduleId}']; const __default = __main.default || {}; ${namedExports} export default __default; `;
};

const loaderPlugin = createPlugin({
  name: "packager-loader-plugin",
  async loader(moduleId: string) {
    const localFile =
      !isModuleExternal(moduleId) &&
      packagerContext.get("files").find((file) => file.path === moduleId);

    if (localFile) {
      return localFile;
    }

    const cachedPackage = moduleId in packagerContext.get("npmDependencies");

    if (cachedPackage) {
      return generateExportForCachedPackage(moduleId);
    }

    const parsedPackageName = parsePackagePath(moduleId);
    const bundleOptions = packagerContext.get("state").bundleOptions;
    const version =
      bundleOptions?.dependencies?.[parsedPackageName.name] || "latest";

    const npmDependency =
      (await fetchDependency(
        parsedPackageName.name,
        version,
        parsedPackageName.path || ""
      )) || null;

    if (npmDependency) {
      const cleanedCode = cleanupExternalDependency(npmDependency.code);

      // packagerContext.set(
      //   "npmDependencies",
      //   deepMerge(packagerContext.get("npmDependencies"), {
      //     [moduleId]: {
      //       ...npmDependency,
      //       code: cleanedCode,
      //     },
      //   })
      // );

      return { code: cleanedCode, moduleId };
    }

    return null;
  },
});

export default loaderPlugin;
