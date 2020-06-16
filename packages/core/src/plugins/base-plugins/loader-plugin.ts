import { createPlugin } from "packager-pluginutils";
import { Plugin } from "../../types";
import {
  packagerContext,
  isModuleExternal,
  fetchDependency,
  parsePackagePath,
} from "../../utils";

const cleanupExternalDependency = (code: string): string =>
  code.replace(/process.env.NODE_ENV/g, "'development'");

const loaderPlugin = createPlugin({
  name: "packager-loader-plugin",
  async loader(moduleId: string) {
    const localFile =
      !isModuleExternal(moduleId) &&
      packagerContext.get("files").find((file) => file.path === moduleId);

    if (localFile) {
      return localFile;
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

      console.log(moduleId);

      // packagerContext.set(
      //   "npmDependencies",
      //   deepMerge(packagerContext.get("npmDependencies"), {
      //     [moduleId]: {
      //       ...npmDependency,
      //       code: cleanedCode,
      //     },
      //   })
      // );

      return { code: cleanedCode };
    }

    return null;
  },
});

export default loaderPlugin;
