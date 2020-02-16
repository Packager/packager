import LessTranspiler from "./less";
import SassTranspiler from "./sass";
import StylusTranspiler from "./stylus";
import SvelteTranspiler from "./svelte";
import TypescriptTranspiler from "./typescript";
import VueTranspiler from "./vue";
import HtmlTranspiler from "./html";
import JsonTranspiler from "./json";
import CssTranspiler from "./css";
import CoffeescriptTranspiler from "./coffeescript";

export default {
    ts: TypescriptTranspiler,
    tsx: TypescriptTranspiler,
    js: TypescriptTranspiler,
    jsx: TypescriptTranspiler,

    less: LessTranspiler,
    sass: SassTranspiler,
    scss: SassTranspiler,
    stylus: StylusTranspiler,
    styl: StylusTranspiler,
    css: CssTranspiler,

    svelte: SvelteTranspiler,
    vue: VueTranspiler,
    coffee: CoffeescriptTranspiler,

    html: HtmlTranspiler,
    json: JsonTranspiler
} as { [name: string]: any };
