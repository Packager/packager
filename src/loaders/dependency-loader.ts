import { PackagerContext, Loader, LoadResult } from "../types/packager";
import fetchNpmDependency from "../utils/fetch-npm-dependency";
import parsePackagePath from "../utils/parse-package-path";

export default function dependencyLoader(context: PackagerContext): Loader {
    return {
        name: "dependency-loader",
        async load(modulePath: string): Promise<LoadResult> {
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
                const cachedNpmDependency = context.cache.dependencies.get(
                    cacheKey
                );
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
                        context.cache.dependencies.set(cacheKey, true);

                        return {
                            code: npmDependency.code
                        };
                    }

                    return null;
                }
            }

            return {
                code: file.code,
                syntheticNamedExports: true
            };
        }
    };
}
