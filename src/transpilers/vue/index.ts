import Transpiler from "../transpiler";
// @ts-ignore
import VueWorker from "web-worker:./vue-worker.ts";
import { PackagerContext } from "packager/types";

import SassTranspiler from "packager/transpilers/sass";
import StylusTranspiler from "packager/transpilers/stylus";
import LessTranspiler from "packager/transpilers/less";
import CssTranspiler from "packager/transpilers/css";

export default class VueTranspiler extends Transpiler {
    public additionalTranspilers = {
        sass: SassTranspiler,
        scss: SassTranspiler,
        styl: StylusTranspiler,
        less: LessTranspiler,
        css: CssTranspiler
    };

    constructor(context: PackagerContext) {
        super("vue-transpiler", new VueWorker(), context);
    }

    transpile(file: any) {
        return this.doTranspile(file);
    }
}
