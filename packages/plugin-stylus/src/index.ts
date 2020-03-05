import { createPlugin } from "packager";
import transpiler from "./transpiler";

const stylusPlugin = createPlugin({
    name: "stylus",
    transpiler
});

export default stylusPlugin;
