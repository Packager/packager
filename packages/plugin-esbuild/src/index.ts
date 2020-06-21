import { createPlugin } from "packager-pluginutils";
// @ts-ignore
import Worker from "web-worker:./worker";
import gateway from "./gateway";

const esbuildPlugin = createPlugin({
  name: "esbuild",
  transpiler: {
    gateway,
    worker: Worker,
  },
});

export default esbuildPlugin;
