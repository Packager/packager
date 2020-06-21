import { packagerContext } from "packager";
import {
  verifyExtensions,
  getModuleInfo,
  ModuleInfo,
} from "packager-pluginutils";

const isValid = verifyExtensions([".js", ".jsx", ".ts", ".tsx"]);
const isEs = (moduleInfo: ModuleInfo) =>
  moduleInfo.meta.hasDefaultExport || moduleInfo.meta.hasNamedExports;

export default function (moduleId: string, code: string) {
  const rootNode = packagerContext.parser(code, {});
  const moduleInfo = getModuleInfo(rootNode);

  return isValid(moduleId) || isEs(moduleInfo);
}
