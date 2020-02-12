import { PackagerContext } from "../types/packager";
import dependencyLoader from "./dependency-loader";
import commonjsLoader from "./commonjs-loader";

export default (context: PackagerContext) => [
    commonjsLoader(context),
    dependencyLoader(context)
];
