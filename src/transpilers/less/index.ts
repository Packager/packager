import Transpiler from "../transpiler";
// @ts-ignore
import LessWorker from "web-worker:./less-worker.ts";
import { PackagerContext } from "../../types/packager";

export default class LessTranspiler extends Transpiler {
    public additionalTranspilers = {};

    constructor(context: PackagerContext) {
        super("less-transpiler", new LessWorker(), context);
    }

    transpile(file: any) {
        return this.doTranspile(file);
    }
}
