import { Plugin, File, WebWorkerContext } from "packager";
import { Node, ModuleInfoExport } from "./module-info/types";

export interface AstNode extends Node {}

export interface RootNode {
  body: Array<Node>;
  end: number;
  sourceType: string;
  start: number;
  type: string;
}

export interface ModuleInfo {
  meta: {
    hasDefaultImports: boolean;
    hasNamedImports: boolean;
    hasNamespaceImports: boolean;
    hasDefaultExport: boolean;
    hasNamedExports: boolean;
    hasUmdWrappers: boolean;
    hasExportAll: boolean;
  };
  defaultExport?: ModuleInfoExport;
  namedExports?: ModuleInfoExport;
}

export declare const path: {
  isAbsolute: (path: string) => boolean;
  isRelative: (path: string) => boolean;
  basename: (path: string) => string | undefined;
  dirname: (path: string) => string;
  extname: (path: string) => string;
  // relative: (from: string, to: string) => string;
  resolve: (...paths: string[]) => string;
  normalize: (path: string) => string;
  sep: string;
};

export declare const styleHelpers: {
  generateExport: (file: File) => string;
};

export declare function createPlugin(options: Plugin): Plugin;

export declare function nodeHasDefaultExport(
  node: Node,
  includeNamed?: boolean
): boolean;
export declare function nodeHasNamedExports(
  node: Node,
  includeDefault?: boolean
): boolean;
export declare function nodeHasExportAll(node: Node): boolean;
export declare function nodeHasDefaultImports(node: Node): boolean;
export declare function nodeHasNamedImports(node: Node): boolean;
export declare function nodeHasNamespaceImports(node: Node): boolean;
export declare function getModuleInfo(rootNode: RootNode): ModuleInfo;

export declare function verifyExtensions(
  extensions: Array<string>
): (path: string) => boolean;

export declare function resolveWorkerDependency(
  moduleId: string
): Promise<WebWorkerContext>;

export declare enum TRANSPILE_STATUS {
  START = "START",
  END = "END",
  ADD_DEPENDENCY = "ADD_DEPENDENCY",
  TRANSPILE_DEPENDENCY = "TRANSPILE_DEPENDENCY",
  ERROR = "ERROR",
}

export declare enum TRANSPILE_ERROR {
  DEPENDENCY_NOT_FOUND = "DEPENDENCY_NOT_FOUND",
}
