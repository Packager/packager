import { createPlugin } from "packager";
// @ts-ignore
import Worker from "web-worker:./worker.ts";
import beforeBundle from "./beforeBundle";

const cssPlugin = createPlugin({
  name: "css",
  extensions: [".css"],
  beforeBundle,
  transpiler: {
    worker: Worker
  }
});

export default cssPlugin;
