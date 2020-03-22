import { PackagerContext, BundleOptions, File } from "packager";

export type ApplicationCache = {
  get: (name: string) => any | undefined;
  getAll: () => { [name: string]: any };
  set: (name: string, value: any) => boolean;
  has: (name: string) => boolean;
  update: (name: string, value: any) => boolean;
  delete: (name: string) => boolean;
  clear: () => void;
};

export type ParsedPackagePath = {
  name: string | null;
  version: string | null;
  path: string | null;
};

export type ModifiedFile = {
  code: string;
  path: string;
};

export type VerifyExtensions = (
  path: string,
  ignoreExternal?: boolean
) => boolean;

export type PathUtil = {
  isAbsolute: (path: string) => boolean;
  isRelative: (path: string) => boolean;
  basename: (path: string) => string | undefined;
  dirname: (path: string) => string;
  extname: (path: string) => string;
  relative: (from: string, to: string) => string;
  resolve: (...paths: string[]) => string;
  normalize: (path: string) => string;
  sep: string;
};

export type DeepMergeArrayValue = string[];
export type DeepMergeObjectValue = { [key: string]: any };
export declare function deepMerge(
  ...sources: DeepMergeArrayValue[]
): DeepMergeArrayValue;
export declare function deepMerge(
  ...sources: DeepMergeObjectValue[]
): DeepMergeObjectValue;

export const cacheFactory: () => ApplicationCache;
export const isModuleExternal: (modulePath: string) => boolean;
export const normalizeBundleOptions: (
  BundleOptions: BundleOptions
) => BundleOptions;
export const parsePackagePath: (name: string) => ParsedPackagePath;
export const path: PathUtil;
export const stylePluginHelpers: {
  generateExport: (
    file: File | ModifiedFile,
    prependExportDefault?: boolean
  ) => string;
  generateExportsForAllStyles: (styles: string[], filePath: string) => string;
};
export const verifyExtensions: (extensions: string[]) => VerifyExtensions;
export const resolveRelative: (
  childPath: string,
  parentPath: string,
  context: PackagerContext,
  pathOnly?: boolean
) => File | string | null;
export const resolveRelativeExternal: (
  childPath: string,
  parentPath: string,
  context: PackagerContext
) => string | null | never;

export const generateSourceMap: (
  filePath: string,
  originalCode: string,
  generatedCode: string
) => string;
