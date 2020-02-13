import Transpiler from "../transpiler";
import { PackagerContext } from "@typedefs/packager";

export default class HtmlTranspiler extends Transpiler {
    public additionalTranspilers = {};

    constructor(context: PackagerContext) {
        super("html-transpiler", null, context);
    }

    transpile(file: any) {
        return this.doTranspile(file);
    }
}
