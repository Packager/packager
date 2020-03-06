import { createPlugin } from "packager";
import transpiler from "./transpiler";

const lessPlugin = createPlugin({
    name: "less",
    transpiler
});

export default lessPlugin;
