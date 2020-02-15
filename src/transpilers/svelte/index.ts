import Transpiler from "../transpiler";
// @ts-ignore
import SvelteWorker from "web-worker:./svelte-worker.ts";
import { PackagerContext } from "packager/types/packager";

import SassTranspiler from "packager/transpilers/sass";
import StylusTranspiler from "packager/transpilers/stylus";
import LessTranspiler from "packager/transpilers/less";
import CssTranspiler from "packager/transpilers/css";

export default class SvelteTranspiler extends Transpiler {
    public static forceExternal = true;

    public additionalTranspilers = {
        sass: SassTranspiler,
        scss: SassTranspiler,
        styl: StylusTranspiler,
        less: LessTranspiler,
        css: CssTranspiler
    };

    constructor(context: PackagerContext) {
        super("svelte-transpiler", new SvelteWorker(), context);
    }

    transpile(file: any) {
        return this.doTranspile(file);
    }
}
