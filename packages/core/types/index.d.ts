import {
    Plugin,
    SourceMap,
    ResolveIdHook as RollupResolveIdHook,
    ResolveIdResult as RollupResolveIdResult,
    LoadHook as RollupLoadHook,
    LoadResult as RollupLoadResult,
    TransformHook as RollupTransformHook,
    TransformResult as RollupTransformResult
} from "rollup";

import { Node } from "acorn";

export type ApplicationCache = {
    get: (name: string) => any | undefined;
    getAll: () => { [name: string]: any };
    set: (name: string, value: any) => boolean;
    has: (name: string) => boolean;
    update: (name: string, value: any) => boolean;
    delete: (name: string) => boolean;
    clear: () => void;
};

export type PackagerOptions = {
    cache: boolean;
    sourcemaps: boolean;
};

export type File = {
    name: string;
    path: string;
    code: string;
    entry?: boolean;
};

export type PackagerContext = {
    acornParser?: (code: string) => Node;
    cache: {
        dependencies: ApplicationCache;
        transpilers: ApplicationCache;
        esModulesWithDefaultExport: any;
        esModulesWithoutDefaultExport: any;
    };
    workerQueue: WorkerQueue;
    files: File[];
    bundleOptions: BundleOptions;
};

export type BundleOptions = {
    dependencies: { [moduleName: string]: string };
};

export interface Transformer extends Plugin {}
export interface Resolver extends Plugin {}
export interface Loader extends Plugin {}
export interface Setup extends Plugin {}
export type TransformResult = RollupTransformResult;
export type ResolveResult = RollupResolveIdResult;
export type LoadResult = RollupLoadResult;

export type ParsedPackagePath = {
    name: string | null;
    version: string | null;
    path: string | null;
};

export type PluginContext = {
    files: File[];
};

export type PluginResolverResult =
    | { id: string; syntheticNamedExports?: boolean | null }
    | string
    | null
    | void;
export type PluginResolverHook = (
    this: PackagerContext,
    moduleId: string,
    parentId?: string
) => Promise<PluginResolverResult> | PluginResolverResult;

export type PluginLoaderResult =
    | {
          code: string;
          map?: string | SourceMap;
          syntheticNamedExports?: boolean | null;
      }
    | string
    | null
    | void;
export type PluginLoaderHook = (
    this: PackagerContext,
    moduleId: string
) => Promise<PluginLoaderResult> | PluginLoaderResult;

export type PluginBeforeBundleHookResult = string | void;
export type PluginBeforeBundleHook = (
    this: PackagerContext,
    code: string,
    moduleId: string
) => Promise<PluginBeforeBundleHookResult> | PluginBeforeBundleHookResult;

export type PluginHook =
    | PluginResolverHook
    | PluginLoaderHook
    | PluginBeforeBundleHook;

export type PluginAPI = {
    name: string;
    transpiler?: any;
    resolver?: PluginResolverHook;
    loader?: PluginLoaderHook;
    beforeBundle?: PluginBeforeBundleHook;
};

export type TranspilerAPI = {
    worker: () => Worker;
    extensions: string[];
};

export type TranspilerFactoryResult = {
    context: PackagerContext;
    worker: Worker;
    extensions: string[];
    transpile: (file: File) => Promise<any>;
};

export type TranspilerFactory = (
    this: TranspilerFactoryResult,
    context: PackagerContext
) => TranspilerFactoryResult;

export type PluginAPIasRollupPlugin = {
    name: string;
    resolveId?: RollupResolveIdHook;
    load?: RollupLoadHook;
    transform?: RollupTransformHook;
};

export type PluginManagerPlugin = PluginAPI & { transformed: boolean };

export type PluginManager = {
    context: PackagerContext;
    setContext: (context: PackagerContext) => void;
    registerPlugin: (plugin: PluginAPI) => void;
    prepareAndGetPlugins: () => PluginManagerPlugin[];
    getRegisteredPlugins: () => PluginManagerPlugin[];
};

export const createPlugin: (options: PluginAPI) => PluginAPI;
export const createTranspiler: (options: TranspilerAPI) => TranspilerFactory;

export enum TRANSPILE_STATUS {
    PREPARE_FILES = "TRANSPILER:FILE:PREPARE",
    PREPARE_ADDITIONAL = "TRANSPILER:ADDITIONAL:PREPARE",
    ADDITIONAL_TRANSPILED = "TRANSPILER:ADDITIONAL:TRANSPILED",
    TRANSPILE_COMPLETE = "TRANSPILER:TRANSPILE:COMPLETE",
    ERROR_COMPILE = "TRANSPILER:ERROR:COMPILE",
    ERROR_ADDITIONAL = "TRANSPILER:ERROR:ADDITIONAL"
}

export type WorkerQueue = {
    complete: any[];
    errors: any[];
    queue: Function[] | any[];
    awaiters: Function[];
    push: (cb: Function | Promise<any>) => void;
    next: () => void;
    callAWaiters: () => void;
};
