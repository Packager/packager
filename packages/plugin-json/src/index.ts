import { createPlugin } from "packager-pluginutils";

const jsonPlugin = createPlugin({
  name: "json",
  extensions: [".json"],
  beforeBundle(code: string) {
    return `export default ${code}`;
  },
});

export default jsonPlugin;
