import { createPlugin } from "packager";
// @ts-ignore
import Worker from "web-worker:./worker.ts";

const cssPlugin = createPlugin({
  name: "css",
  extensions: [".css"],
  transpiler: {
    worker: Worker
  }
});

export default cssPlugin;
