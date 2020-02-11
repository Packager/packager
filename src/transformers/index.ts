import { PackagerContext } from "../types/packager";
import commonjsTransformer from "./commonjs-transformer";
import sassTransformer from "./sass-transformer";
import stylusTransformer from "./stylus-transformer";
import lessTransformer from "./less-transformer";
import vueTransformer from "./vue-transformer";
import typescriptTransformer from "./typescript-transformer";
import svelteTransformer from "./svelte-transformer";
import jsonTransformer from "./json-transformer";
import cssTransformer from "./css-transformer";

export default (context: PackagerContext) => [
    commonjsTransformer(context),
    sassTransformer(context),
    stylusTransformer(context),
    lessTransformer(context),
    cssTransformer(context),
    typescriptTransformer(context),
    vueTransformer(context),
    svelteTransformer(context),
    jsonTransformer(context)
];
