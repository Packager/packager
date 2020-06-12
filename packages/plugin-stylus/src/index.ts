import { createPlugin, styleHelpers } from "packager-pluginutils";
// @ts-ignore
import Worker from "web-worker:./worker";

const stylusPlugin = createPlugin({
  name: "stylus",
  extensions: [".styl"],
  transpiler: {
    worker: Worker,
  },
  beforeBundle(code: string, moduleId: string) {
    return styleHelpers.generateExport({ path: moduleId, code });
  },
});

export default stylusPlugin;
