import { createPlugin } from "packager-pluginutils";
// @ts-ignore
import Worker from "web-worker:./worker";

const typescriptPlugin = createPlugin({
  name: "typescript",
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  transpiler: {
    worker: Worker,
  },
});

export default typescriptPlugin;
