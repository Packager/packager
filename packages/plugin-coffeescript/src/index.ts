import { createPlugin } from "packager";
// @ts-ignore
import transpiler from "./transpiler";

const coffeescriptPlugin = createPlugin({
    name: "coffeescript-plugin",
    transpiler
});

export default coffeescriptPlugin;
