import { PluginContext } from "packager";
import { verifyExtensions } from "packager-shared";

export default function(this: PluginContext, code: string, moduleId: string) {
  const isJson = verifyExtensions([".json"]);

  if (isJson(moduleId)) {
    return `export default ${code}`;
  }
}
