import { PackagerContext } from "../types/packager";
import commonjsTransformer from "./commonjs";
import sassTransformer from "./sass-transformer";
import stylusTransformer from "./stylus-transformer";
import lessTransformer from "./less-transformer";
import vueTransformer from "./vue-transformer";
import typescriptTransformer from "./typescript-transformer";
import svelteTransformer from "./svelte-transformer";
import jsonTransformer from "./json-transformer";
import cssTransformer from "./css-transformer";
import codeReplaceTransformer from "./code-replace-transformer";

export default (context: PackagerContext) => [
    typescriptTransformer(context),
    commonjsTransformer(context),

    codeReplaceTransformer(context),

    vueTransformer(context),
    svelteTransformer(context),

    sassTransformer(context),
    stylusTransformer(context),
    lessTransformer(context),
    cssTransformer(context),

    jsonTransformer(context)
];
