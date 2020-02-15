import { PackagerContext, Loader, LoadResult } from "packager/types/packager";
import parsePackagePath from "packager/shared/parse-package-path";
import { fetchNpmDependency } from "./utils";

const cleanupExternalDependency = (code: string): string =>
    code.replace(/process.env.NODE_ENV/g, "'production'");

export default function dependencyLoader(context: PackagerContext): Loader {
    return {
        name: "packager::loader::dependency-loader",
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
                    context.bundleOptions.dependencies[moduleName] ||
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
                        const cleanUpCode = cleanupExternalDependency(
                            npmDependency.code
                        );

                        context.cache.dependencies.set(modulePath, {
                            ...npmDependency,
                            code: cleanUpCode,
                            name: modulePath
                        });

                        return {
                            code: cleanUpCode,
                            syntheticNamedExports: true
                        };
                    }

                    return null;
                }

                return {
                    code: ""
                };
            }

            return {
                code: file.code,
                syntheticNamedExports: true
            };
        }
    };
}
