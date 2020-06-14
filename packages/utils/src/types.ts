import { Plugin, File, WebWorkerContext } from "packager";

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
