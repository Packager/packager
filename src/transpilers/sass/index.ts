import Transpiler from "../transpiler";
// @ts-ignore
import SassWorker from "web-worker:./sass-worker.ts";
import { PackagerContext } from "@typedefs/packager";

export default class SassTranspiler extends Transpiler {
    public additionalTranspilers = {};

    constructor(context: PackagerContext) {
        super("sass-transpiler", new SassWorker(), context);
    }

    transpile(file: any) {
        return this.doTranspile(file);
    }
}
