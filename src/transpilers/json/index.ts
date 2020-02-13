import Transpiler from "../transpiler";
import { PackagerContext } from "@typedefs/packager";

export default class JsonTranspiler extends Transpiler {
    public additionalTranspilers = {};

    constructor(context: PackagerContext) {
        super("json-transpiler", null, context);
    }

    transpile(file: any) {
        return this.doTranspile(file);
    }
}
