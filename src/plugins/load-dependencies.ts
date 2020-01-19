import { Plugin } from "rollup";

import { PluginContext } from "./";
import fetchNpmDependency from "../utils/fetch-npm-dependency";
import parsePackagePath from "../utils/parse-package-path";

export default function loadDependencies(context: PluginContext): Plugin {
    return {
        name: "load-dependencies",
        async load(modulePath: string) {
            const file = context.files.find(f => f.path === modulePath);

            if (!file) {
                const moduleMeta = parsePackagePath(modulePath);
                const moduleName = moduleMeta.name?.split("__")[0];

                if (!moduleName)
                    throw new Error(
                        "There was an issue with loading deps for " + modulePath
                    );

                const version =
                    context.bundleOptions.externalModules[moduleName] ||
                    "latest";
                const cacheKey = `${moduleName}@${version}${moduleMeta.path ||
                    ""}`;
                const cachedNpmDependency = context.cache.get(cacheKey);
                if (cachedNpmDependency) {
                    return "";
                } else {
                    const npmDependency =
                        (await fetchNpmDependency(
                            moduleName,
                            version,
                            moduleMeta.path || ""
                        )) || "";

                    if (npmDependency) {
                        context.cache.set(cacheKey, true);

                        return {
                            code: npmDependency.code
                        };
                    }

                    return null;
                }
            }

            return {
                code: file.code
            };
        }
    };
}
