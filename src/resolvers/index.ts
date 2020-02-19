import { PackagerContext } from "packager/types";
import dependencyResolver from "./dependency-resolver";
import commonsJsResolver from "./commonjs-resolver";

export default (context: PackagerContext) => [
    commonsJsResolver(context),
    dependencyResolver(context)
];
