import { createPlugin } from "packager-pluginutils";
// @ts-ignore
import Worker from "web-worker:./worker";

const esbuildPlugin = createPlugin({
  name: "esbuild",
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  transpiler: {
    worker: Worker,
  },
});

export default esbuildPlugin;
