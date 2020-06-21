import { walk } from "estree-walker";
import { Node } from "./types";
import { RootNode, ModuleInfo } from "../types";
import {
  nodeHasDefaultImports,
  nodeHasNamedImports,
  nodeHasNamespaceImports,
  nodeHasDefaultExport,
  nodeHasNamedExports,
  nodeHasExportAll,
} from "../ast-helpers";

const defaultModuleInfo = {
  meta: {
    hasDefaultImports: false,
    hasNamedImports: false,
    hasNamespaceImports: false,
    hasDefaultExport: false,
    hasNamedExports: false,
    hasExportAll: false,
    hasUmdWrappers: false,
  },
} as ModuleInfo;

/**
 * This util accepts the generated ESTree-compliant AST
 * such as what acorn outputs.
 */
export default function (rootNode: RootNode): ModuleInfo {
  let moduleInfo = defaultModuleInfo;

  walk(rootNode, {
    enter(node: Node) {
      if (nodeHasDefaultImports(node)) {
        moduleInfo.meta.hasDefaultImports = true;
      }

      if (nodeHasNamedImports(node)) {
        moduleInfo.meta.hasNamedImports = true;
      }

      if (nodeHasNamespaceImports(node)) {
        moduleInfo.meta.hasNamespaceImports = true;
      }

      if (nodeHasDefaultExport(node)) {
        moduleInfo.meta.hasDefaultExport = true;
      }

      if (nodeHasNamedExports(node)) {
        moduleInfo.meta.hasNamedExports = true;
      }

      if (nodeHasExportAll(node)) {
        moduleInfo.meta.hasExportAll = true;
      }
    },
  });

  return moduleInfo;
}
