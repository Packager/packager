import Transpiler from "../transpiler";
// @ts-ignore
import TypescriptWorker from "web-worker:./typescript-worker.ts";
import { PackagerContext } from "@typedefs/packager";

export default class TypescriptTranspiler extends Transpiler {
    public additionalTranspilers = {};

    constructor(context: PackagerContext) {
        super("typescript-transpiler", new TypescriptWorker(), context);
    }

    transpile(file: any) {
        return this.doTranspile(file);
    }
}
