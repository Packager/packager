import { createPlugin } from "packager";
import beforeBundle from "./beforeBundle";
// @ts-ignore
import Worker from "web-worker:./worker.ts";

const lessPlugin = createPlugin({
  name: "less",
  extensions: [".less"],
  beforeBundle,
  transpiler: {
    worker: Worker
  }
});

export default lessPlugin;
