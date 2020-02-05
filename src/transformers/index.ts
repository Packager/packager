import { PackagerContext } from "../types/packager";
import externalDependencyTransformer from "./external-dependency-transformer";
import sassTransformer from "./sass-transformer";
import stylusTransformer from "./stylus-transformer";
import lessTransformer from "./less-transformer";
import vueTransformer from "./vue-transformer";

export default (context: PackagerContext) => [
    externalDependencyTransformer(context),
    sassTransformer(context),
    stylusTransformer(context),
    lessTransformer(context),
    vueTransformer(context)
];
