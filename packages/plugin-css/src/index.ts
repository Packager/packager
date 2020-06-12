import { createPlugin, styleHelpers } from "packager-pluginutils";
// @ts-ignore
import Worker from "web-worker:./worker";

const cssPlugin = createPlugin({
  name: "css",
  extensions: [".css"],
  transpiler: {
    worker: Worker,
  },
  beforeBundle(code: string, moduleId: string) {
    return styleHelpers.generateExport({ path: moduleId, code });
  },
});

export default cssPlugin;
