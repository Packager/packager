import { Plugin } from "rollup";
import { PackagerContext } from "./";

export default function transformExternalDependencies(
    context: PackagerContext
): Plugin {
    return {
        name: "transform-external-dependencies",
        transform(code: string, modulePath: string) {
            // @ts-ignore
            if (!modulePath.startsWith("/") && window.Babel) {
                let tempCode = code;

                if (
                    // @ts-ignore
                    !window.__dependencies ||
                    // @ts-ignore
                    !window.__dependencies[modulePath]
                ) {
                    // @ts-ignore
                    const { code: _code } = window.Babel.transform(tempCode, {
                        plugins: ["transform-commonjs"],
                        compact: false,
                        moduleId: modulePath
                    });

                    code = _code;
                }

                return {
                    code: `${code} export default window.__dependencies['${modulePath}'];`,
                    map: { mappings: "" }
                };
            }
        }
    };
}
