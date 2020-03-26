import { PluginContext } from "packager";
import { stylePluginHelpers } from "packager-shared";

export default function(this: PluginContext, code: string, moduleId: string) {
  return stylePluginHelpers.generateExport({
    code,
    path: moduleId
  });
}
