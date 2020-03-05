import { createPlugin } from "packager";
import transpiler from "./transpiler";

const cssPlugin = createPlugin({
    name: "css",
    transpiler
});

export default cssPlugin;
