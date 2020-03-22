import { createPlugin } from "packager";
// @ts-ignore
import Worker from "web-worker:./worker.ts";

const typescriptPlugin = createPlugin({
  name: "typescript",
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  transpiler: {
    worker: Worker
  }
});

export default typescriptPlugin;
