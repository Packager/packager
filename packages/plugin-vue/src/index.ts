import { createPlugin } from "packager";
// @ts-ignore
import Worker from "web-worker:./worker.ts";

const vuePlugin = createPlugin({
  name: "vue",
  extensions: [".vue"],
  transpiler: {
    worker: Worker
  }
});

export default vuePlugin;
