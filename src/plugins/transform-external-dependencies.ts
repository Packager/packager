import { Plugin } from "rollup";
import path from "../utils/path";
import { PluginContext, File } from "./";

export default function transformExternalDependencies(
    context: PluginContext
): Plugin {
    return {
        name: "transform-external-dependencies",
        transform(code: string, modulePath: string) {
            // @ts-ignore
            if (!modulePath.startsWith("/") && window.Babel) {
                if (
                    // @ts-ignore
                    !window.__dependencies ||
                    // @ts-ignore
                    !window.__dependencies[modulePath]
                ) {
                    // @ts-ignore
                    const { code: _code } = window.Babel.transform(code, {
                        plugins: ["transform-commonjs"],
                        compact: false,
                        moduleId: modulePath
                    });

                    eval(_code);
                }

                return {
                    code: `export default window.__dependencies['${modulePath}']`,
                    map: { mappings: "" }
                };
            }
        }
    };
}
