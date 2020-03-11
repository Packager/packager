import { createPlugin } from "packager";
import transpiler from "./transpiler";

const vuePlugin = createPlugin({
    name: "vue",
    transpiler,
    extensions: [".vue"]
});

export default vuePlugin;
