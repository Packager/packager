import { createPlugin, verifyExtensions } from "packager-pluginutils";

const isValid = verifyExtensions([".json"]);

const jsonPlugin = createPlugin({
  name: "json",
  transpiler: {
    gateway(moduleId: string) {
      return isValid(moduleId);
    },
    beforeBundle(_, code: string) {
      return `export default ${code}`;
    },
  },
});

export default jsonPlugin;
