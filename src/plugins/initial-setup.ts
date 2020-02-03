import { Plugin } from "rollup";

import { PackagerContext } from "./";
import findDependencies from "../utils/find-dependencies";
import babelCjsPlugin from "../utils/babel-cjs-plugin";

const loadBabel = () => {
    return new Promise(resolve => {
        const script = document.createElement("script");
        script.src =
            "https://cdn.jsdelivr.net/npm/@babel/standalone@latest/babel.min.js";
        script.setAttribute("data-packager", "true");
        script.onload = resolve;
        document.head.appendChild(script);
    });
};

const loadBabelTypes = () => {
    return new Promise(resolve => {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@bloxy/iife-libs/libs/babel-types.js";
        script.setAttribute("data-packager", "true");
        script.onload = resolve;
        document.head.appendChild(script);
    });
};

export default function initialSetup(context: PackagerContext): Plugin {
    return {
        name: "initial-setup",
        async buildStart() {
            const entryFile = context.files.find(f => f.entry)!;
            const dependencies = findDependencies(entryFile, context, true);

            if (
                dependencies._hasExternal &&
                // @ts-ignore
                (!window.Babel || !window._babel_types)
            ) {
                try {
                    await loadBabel();
                    await loadBabelTypes();
                } catch (e) {
                    throw e;
                }

                // @ts-ignore
                if (!window.Babel.availablePlugins["transform-commonjs"]) {
                    // @ts-ignore
                    window.Babel.registerPlugin(
                        "transform-commonjs",
                        // @ts-ignore
                        babelCjsPlugin(window._babel_types)
                    );
                }
            }
        }
    };
}
