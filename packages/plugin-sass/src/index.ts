import { createPlugin } from "packager";
import transpiler from "./transpiler";
import beforeBundle from "./beforeBundle";

const sassPlugin = createPlugin({
    name: "sass",
    transpiler,
    beforeBundle,
    extensions: [".sass", ".scss"]
});

export default sassPlugin;
