import { PackagerContext } from "packager/types";
import buildStart from "./build-start";
import intro from "./intro";

export default (context: PackagerContext) => [
    buildStart(context),
    intro(context)
];
