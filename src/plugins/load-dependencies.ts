import { Plugin } from "rollup";

import { PluginContext } from "./";
import fetchNpmDependency from "../utils/fetch-npm-dependency";

export default function loadDependencies(context: PluginContext): Plugin {
    return {
        name: "load-dependencies",
        async load(modulePath: string) {
            const file = context.files.find(f => f.path === modulePath);

            if (!file) {
                const version =
                    context.bundleOptions.externalModules[modulePath];
                const cacheKey = `${modulePath}@${version}`;
                const cachedNpmDependency = context.cache.get(cacheKey);

                if (cachedNpmDependency) {
                    return {
                        code: cachedNpmDependency.code
                    };
                } else {
                    const npmDependency =
                        (await fetchNpmDependency(modulePath, version)) || "";

                    if (npmDependency) {
                        context.cache.set(cacheKey, {
                            module: modulePath,
                            code: npmDependency.code,
                            path: npmDependency.metadata.link
                        });

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
        },
        transform(code: any, source: string) {
            if (!source.startsWith("/")) {
                return { code, map: { mappings: "" } };
            }
        }
    };
}
