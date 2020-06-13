import { createPlugin, verifyExtensions } from "packager-pluginutils";
// @ts-ignore
import Worker from "web-worker:./worker";

const isValid = verifyExtensions([".js", ".jsx", ".ts", ".tsx"]);

const esbuildPlugin = createPlugin({
  name: "esbuild",
  transpiler: {
    gateway(moduleId: string) {
      return isValid(moduleId);
    },
    worker: Worker,
  },
});

export default esbuildPlugin;
