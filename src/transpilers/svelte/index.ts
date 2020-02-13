import Transpiler from "../transpiler";
// @ts-ignore
import SvelteWorker from "web-worker:./svelte-worker.ts";
import { PackagerContext } from "@typedefs/packager";

import SassTranspiler from "@transpilers/sass";
import StylusTranspiler from "@transpilers/stylus";
import LessTranspiler from "@transpilers/less";
import CssTranspiler from "@transpilers/css";

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
