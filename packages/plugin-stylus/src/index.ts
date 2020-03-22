import { createPlugin } from "packager";
// @ts-ignore
import Worker from "web-worker:./worker.ts";

const stylusPlugin = createPlugin({
  name: "stylus",
  extensions: [".styl", ".stylus"],
  transpiler: {
    worker: Worker
  }
});

export default stylusPlugin;
