import Transpiler from "../transpiler";
// @ts-ignore
import SvelteWorker from "web-worker:./svelte-worker.ts";
import { PackagerContext } from "../../types/packager";
import SassTranspiler from "../sass";
import StylusTranspiler from "../stylus";
import LessTranspiler from "../less";

export default class SvelteTranspiler extends Transpiler {
    public static forceExternal = true;

    public additionalTranspilers = {
        sass: SassTranspiler,
        scss: SassTranspiler,
        styl: StylusTranspiler,
        less: LessTranspiler
    };

    constructor(context: PackagerContext) {
        super("svelte-transpiler", new SvelteWorker(), context);
    }

    transpile(file: any) {
        return this.doTranspile(file);
    }
}
