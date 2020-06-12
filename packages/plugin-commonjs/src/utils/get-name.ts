import { path } from "packager-pluginutils";
import makeLegalIdentifier from "./mage-legal-identifier";

export default function (moduleId: string) {
  const name = makeLegalIdentifier(path.basename(moduleId));
  if (name !== "index") {
    return name;
  }
  const segments = path.dirname(moduleId).split(path.sep);
  return makeLegalIdentifier(segments[segments.length - 1]);
}
