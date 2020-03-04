import { createPlugin } from "packager";
import transpiler from "./transpiler";

const sassPlugin = createPlugin({
    name: "sass",
    transpiler
});

export default sassPlugin;
