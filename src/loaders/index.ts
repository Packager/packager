import { PackagerContext } from "packager/types";
import dependencyLoader from "./dependency-loader";
import commonjsLoader from "./commonjs-loader";

export default (context: PackagerContext) => [
    commonjsLoader(context),
    dependencyLoader(context)
];
