import { PackagerContext } from "../types/packager";
import dependencyLoader from "./dependency-loader";

export default (context: PackagerContext) => [dependencyLoader(context)];
