import { createPlugin } from "packager";
// @ts-ignore
import Worker from "web-worker:./worker.ts";

const sveltePlugin = createPlugin({
  name: "svelte",
  extensions: [".svelte"],
  transpiler: {
    worker: Worker
  }
});

export default sveltePlugin;
