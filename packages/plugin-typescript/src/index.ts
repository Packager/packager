import { createPlugin } from "packager";
import transpiler from "./transpiler";

const typescriptPlugin = createPlugin({
    name: "typescript",
    transpiler
});

export default typescriptPlugin;
