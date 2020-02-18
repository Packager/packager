import { PackagerContext } from "../types/packager";
import commonjsTransformer from "./commonjs";
import sassTransformer from "./sass";
import stylusTransformer from "./stylus";
import lessTransformer from "./less";
import vueTransformer from "./vue";
import typescriptTransformer from "./typescript";
import svelteTransformer from "./svelte";
import jsonTransformer from "./json";
import cssTransformer from "./css";
import coffeescriptTransformer from "./coffeescript";

export default (context: PackagerContext) => [
    // General
    typescriptTransformer(context),
    commonjsTransformer(context),

    // JS Frameworks
    // vueTransformer(context),
    svelteTransformer(context),

    // Styles
    sassTransformer(context),
    stylusTransformer(context),
    lessTransformer(context),
    cssTransformer(context),

    // Other
    jsonTransformer(context),
    coffeescriptTransformer(context)
];
