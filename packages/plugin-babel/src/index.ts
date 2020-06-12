import { createPlugin } from "packager-pluginutils";
// @ts-ignore
import Worker from "web-worker:./worker";

const babelPlugin = createPlugin({
  name: "babel",
  extensions: [".js"],
  transpiler: { worker: Worker },
});

export default babelPlugin;
