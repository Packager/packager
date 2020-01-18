import { Plugin } from "rollup";

import { PluginContext } from "./";
import findDependencies from "../utils/find-dependencies";

const loadBabel = () => {
    return new Promise(resolve => {
        console.log("fetching...");
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
            const entryFile = context.files.find(f => f.entry)!;
            const dependencies = findDependencies(
                this.parse,
                entryFile,
                context,
                true
            );

            // @ts-ignore
            if (!window.Babel) {
                await loadBabel();
            }
        }
    };
}
