import { createPlugin } from "packager";
import beforeBundle from "./beforeBundle";
// @ts-ignore
import Worker from "web-worker:./worker.ts";

const sassPlugin = createPlugin({
  name: "sass",
  beforeBundle,
  extensions: [".sass", ".scss"],
  transpiler: {
    worker: Worker
  }
});

export default sassPlugin;
