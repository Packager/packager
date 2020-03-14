import { createPlugin } from "packager";
import transpiler from "./transpiler";

const typescriptPlugin = createPlugin({
    name: "typescript",
    transpiler,
    extensions: [".js", ".jsx", ".ts", ".tsx"]
});

export default typescriptPlugin;
