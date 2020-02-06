import { PackagerContext } from "../types/packager";
import externalDependencyTransformer from "./external-dependency-transformer";
import sassTransformer from "./sass-transformer";
import stylusTransformer from "./stylus-transformer";
import lessTransformer from "./less-transformer";
import vueTransformer from "./vue-transformer";
import typescriptTransformer from "./typescript-transformer";
import svelteTransformer from "./svelte-transformer";

export default (context: PackagerContext) => [
    externalDependencyTransformer(context),
    sassTransformer(context),
    stylusTransformer(context),
    lessTransformer(context),
    typescriptTransformer(context),
    vueTransformer(context),
    svelteTransformer(context)
];
