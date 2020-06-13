import { createPlugin } from "packager-pluginutils";
// @ts-ignore
import worker from "web-worker:./worker";
import gateway from "./gateway";

const babelPlugin = createPlugin({
  name: "babel",
  transpiler: { gateway, worker },
});

export default babelPlugin;
