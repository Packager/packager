import LessTranspiler from "./less";
import SassTranspiler from "./sass";
import StylusTranspiler from "./stylus";
import SvelteTranspiler from "./svelte";
import TypescriptTranspiler from "./typescript";
import VueTranspiler from "./vue";

export default {
    less: LessTranspiler,
    sass: SassTranspiler,
    scss: SassTranspiler,
    stylus: StylusTranspiler,
    styl: StylusTranspiler,
    svelte: SvelteTranspiler,
    ts: TypescriptTranspiler,
    tsx: TypescriptTranspiler,
    js: TypescriptTranspiler,
    jsx: TypescriptTranspiler,
    vue: VueTranspiler
} as { [name: string]: any };
