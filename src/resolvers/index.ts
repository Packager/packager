import { PackagerContext } from "../types/packager";
import dependencyResolver from "./dependency-resolver";
import commonsJsResolver from "./commonjs-resolver";

export default (context: PackagerContext) => [
    commonsJsResolver(context),
    dependencyResolver(context)
];
