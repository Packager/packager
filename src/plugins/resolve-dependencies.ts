import { Plugin } from "rollup";
import { PluginContext } from "./";

export default function resolveDependencies(context: PluginContext): Plugin {
    const isExternal = (moduleName: string) => moduleName.startsWith(".");

    return {
        name: "resolve-dependencies",
        resolveId(moduleName: string, parent?: string) {
            if (!parent) return moduleName;

            if (isExternal(moduleName)) return moduleName;

            return moduleName;
        },
        load() {
            return "";
        }
    };
}
