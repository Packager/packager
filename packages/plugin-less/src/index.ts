import {
  createPlugin,
  verifyExtensions,
  styleHelpers,
} from "packager-pluginutils";
// @ts-ignore
import Worker from "web-worker:./worker";

import transpileLessFile from "./utils/transpile-less-file";

const isValid = verifyExtensions([".less"]);

const lessPlugin = createPlugin({
  name: "less",
  transpiler: {
    gateway(moduleId: string) {
      return isValid(moduleId);
    },
    worker: Worker,
    beforeBundle(moduleId: string, code: string) {
      return styleHelpers.generateExport({ path: moduleId, code });
    },
  },
});

export { transpileLessFile };

export default lessPlugin;
