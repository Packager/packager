import { createPlugin } from "packager";
import transpiler from "./transpiler";

const coffeescriptPlugin = createPlugin({
    name: "coffeescript",
    transpiler
});

export default coffeescriptPlugin;
