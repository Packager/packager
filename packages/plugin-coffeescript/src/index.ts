import { createPlugin } from "packager";
// @ts-ignore
import Worker from "web-worker:./worker.ts";

const coffeescriptPlugin = createPlugin({
  name: "coffeescript",
  extensions: [".coffee"],
  transpiler: {
    worker: Worker
  }
});

export default coffeescriptPlugin;
