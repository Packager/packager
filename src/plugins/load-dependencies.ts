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
                const npmCode =
                    (await fetchNpmDependency(modulePath, version)) || "";

                return { code: npmCode, map: "" };
            }

            return {
                code: file.code
            };
        }
    };
}
