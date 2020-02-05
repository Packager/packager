import { PackagerContext } from "../types/packager";
import dependencyResolver from "./dependency-resolver";

export default (context: PackagerContext) => [dependencyResolver(context)];
