import { PackagerContext, Loader, LoadResult } from "../../../types";
import { parsePackagePath } from "packager-shared";
import { fetchNpmDependency } from "../utils";

const cleanupExternalDependency = (code: string): string =>
    code.replace(/process.env.NODE_ENV/g, "'development'");

export default function baseLoader(context: PackagerContext): Loader {
    return {
        name: "packager::loader::base-loader",
        async load(moduleId: string): Promise<LoadResult> {
            const file = context.files.find(f => f.path === moduleId);

            if (moduleId && !file) {
                const moduleMeta = parsePackagePath(moduleId);
                const moduleName = moduleMeta.name?.split("__")[0];
                if (!moduleName)
                    throw new Error(
                        "There was an issue with loading deps for " + moduleId
                    );

                const version =
                    moduleMeta.version ||
                    context.bundleOptions.dependencies[moduleName] ||
                    "latest";

                const cachedNpmDependency = context.cache.dependencies.get(
                    moduleId
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

                        context.cache.dependencies.set(moduleId, {
                            ...npmDependency,
                            code: cleanUpCode,
                            name: moduleId
                        });

                        return {
                            code: cleanUpCode
                        };
                    }

                    return null;
                }

                return {
                    code: ""
                };
            } else if (moduleId && file) {
                return {
                    code: file.code
                };
            }

            return null;
        }
    };
}
