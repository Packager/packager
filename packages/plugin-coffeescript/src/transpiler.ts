import { createTranspiler } from "packager";
// @ts-ignore
import Worker from "web-worker:./worker.ts";

const transpiler = createTranspiler({
    worker: Worker,
    extensions: [".coffee"]
});

export default transpiler;
