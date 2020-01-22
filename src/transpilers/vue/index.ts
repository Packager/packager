import Transpiler from "../transpiler";
// @ts-ignore
import WebWorker from "web-worker:./vue-worker.ts";
// import WebWorker from "web-worker:./vue-worker.ts";
import { PackagerContext } from "../../plugins";

export default class VueTranspiler extends Transpiler {
    constructor(context: PackagerContext) {
        super("vue-transpiler", new WebWorker(), context);
    }

    transpile(file: any) {
        return this.doTranspile(file);
    }
}
