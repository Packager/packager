import Transpiler from "../transpiler";
// @ts-ignore
import VueWorker from "web-worker:./vue-worker.ts";
import { PackagerContext } from "@typedefs/packager";

import SassTranspiler from "@transpilers/sass";
import StylusTranspiler from "@transpilers/stylus";
import LessTranspiler from "@transpilers/less";
import CssTranspiler from "@transpilers/css";

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
