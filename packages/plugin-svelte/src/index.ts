import { createPlugin } from "packager";
import transpiler from "./transpiler";

const sveltePlugin = createPlugin({
    name: "svelte",
    transpiler,
    extensions: [".svelte"]
});

export default sveltePlugin;
