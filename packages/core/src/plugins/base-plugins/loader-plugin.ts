import { createPlugin } from "packager-pluginutils";
import {
  packagerContext,
  isModuleExternal,
  fetchDependency,
  parsePackagePath,
} from "../../utils";
import { reservedWords } from "./utils";

const cleanupExternalDependency = (code: string): string =>
  code.replace(/process.env.NODE_ENV/g, "'development'");

const generateExportForCachedPackage = (moduleId: string) => {
  const reserved = reservedWords.split(" ");
  const namedExportKeys = Object.keys(
    packagerContext.get("npmDependencies")[moduleId]
  );
  const namedExports = namedExportKeys.length
    ? `export const { ${namedExportKeys
        .filter((m) => !reserved.includes(m))
        .map((m) => `${m}`)} } = __default;`
    : "";

  return `const __default = window.__PACKAGER_CONTEXT__.npmDependencies['${moduleId}']; ${namedExports} export default __default; `;
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
