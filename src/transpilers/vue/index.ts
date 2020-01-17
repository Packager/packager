import Transpiler from "../transpiler";
import WebWorker from "web-worker:./worker.ts";

export default class VueTranspiler extends Transpiler {
    constructor() {
        super("vue-transpiler", new WebWorker());
    }
}
