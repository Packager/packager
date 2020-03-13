import { createPlugin } from "packager";
import transpiler from "./transpiler";

const coffeescriptPlugin = createPlugin({
    name: "coffeescript",
    transpiler,
    extensions: [".coffee"]
});

export default coffeescriptPlugin;
