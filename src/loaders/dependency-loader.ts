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
                    moduleMeta.version ||
                    context.bundleOptions.externalModules[moduleName] ||
                    "latest";

                const cachedNpmDependency = context.cache.dependencies.get(
                    modulePath
                );

                if (!cachedNpmDependency) {
                    const npmDependency =
                        (await fetchNpmDependency(
                            moduleName,
                            version,
                            moduleMeta.path || ""
                        )) || "";

                    if (npmDependency) {
                        context.cache.dependencies.set(modulePath, {
                            ...npmDependency,
                            name: modulePath
                        });

                        return {
                            code: npmDependency.code,
                            syntheticNamedExports: true
                        };
                    }

                    return null;
                }

                return { code: "" };
            }

            return {
                code: file.code,
                syntheticNamedExports: true
            };
        }
    };
}
