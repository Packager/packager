import Transpiler from "../transpiler";
// @ts-ignore
import CoffeescriptWorker from "web-worker:./coffeescript-worker.ts";
import { PackagerContext } from "packager/types";

export default class CoffeescriptTranspiler extends Transpiler {
    public additionalTranspilers = {};

    constructor(context: PackagerContext) {
        super("coffeescript-transpiler", new CoffeescriptWorker(), context);
    }

    async transpile(file: any) {
        return this.doTranspile(file);
    }
}
