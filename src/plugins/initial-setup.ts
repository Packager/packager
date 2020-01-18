import { Plugin } from "rollup";

import { PluginContext } from "./";
import resolver from "../utils/external-resolver";

const loadBabel = () => {
    return new Promise(resolve => {
        const script = document.createElement("script");
        script.src =
            "https://cdn.jsdelivr.net/npm/@babel/standalone@latest/babel.min.js";
        script.onload = resolve;
        document.head.appendChild(script);
    });
};

export default function initialSetup(context: PluginContext): Plugin {
    return {
        name: "initial-setup",
        async buildStart() {
            // @ts-ignore
            if (!window.Babel) {
                await loadBabel();
            }
        }
    };
}
