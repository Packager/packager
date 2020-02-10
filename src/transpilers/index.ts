import LessTranspiler from "./less";
import SassTranspiler from "./sass";
import StylusTranspiler from "./stylus";
import SvelteTranspiler from "./svelte";
import TypescriptTranspiler from "./typescript";
import VueTranspiler from "./vue";
import HtmlTranspiler from "./html";
import JsonTranspiler from "./json";

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
    vue: VueTranspiler,
    html: HtmlTranspiler,
    json: JsonTranspiler
} as { [name: string]: any };
