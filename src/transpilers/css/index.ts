import Transpiler from "../transpiler";
// @ts-ignore
import CssWorker from "web-worker:./css-worker.ts";
import { PackagerContext } from "packager/types";

export default class CssTranspiler extends Transpiler {
    public additionalTranspilers = {};

    constructor(context: PackagerContext) {
        super("css-transpiler", new CssWorker(), context);
    }

    async transpile(file: any) {
        return this.doTranspile(file);
    }
}
