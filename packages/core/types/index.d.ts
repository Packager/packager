import {
    Plugin,
    SourceMap,
    PluginContext as RollupPluginContext,
    ResolveIdHook as RollupResolveIdHook,
    ResolveIdResult as RollupResolveIdResult,
    LoadHook as RollupLoadHook,
    LoadResult as RollupLoadResult,
    TransformHook as RollupTransformHook,
    TransformResult as RollupTransformResult
} from "rollup";

import { Parser } from "acorn";

declare global {
    interface Window {
        __dependencies?: { [key: string]: any };
    }
}

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

export type PackagerCache = {
    dependencies: ApplicationCache;
    transpilers: ApplicationCache;
    esModulesWithDefaultExport: any;
    esModulesWithoutDefaultExport: any;
};

export type PackagerContext = {
    acornParser?: Parser["parse"];
    cache: PackagerCache;
    workerQueue: WorkerQueue;
    files: File[];
    bundleOptions: BundleOptions;
    plugins: PluginContext[];
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

export type PluginResolverResult =
    | { id: string; syntheticNamedExports?: boolean | null }
    | string
    | null
    | void;
export type PluginResolverHook = (
    this: PluginContext,
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
    this: PluginContext,
    moduleId: string
) => Promise<PluginLoaderResult> | PluginLoaderResult;

export type PluginBeforeBundleHookResult = string | null | void;
export type PluginBeforeBundleHook = (
    this: PluginContext,
    code: string,
    moduleId: string
) => Promise<PluginBeforeBundleHookResult> | PluginBeforeBundleHookResult;

export type PluginHook =
    | PluginResolverHook
    | PluginLoaderHook
    | PluginBeforeBundleHook;

export type PluginAPI = {
    name: string;
    transpiler?: (context: PluginContext) => TranspilerFactoryResult;
    resolver?: PluginResolverHook;
    loader?: PluginLoaderHook;
    beforeBundle?: PluginBeforeBundleHook;
    extensions?: string[];
};

export type PluginContext = {
    name: string;
    packagerContext: PackagerContext;
    transpiler?: {
        name: string;
        extensions: string[];
    };
    rawPlugin: PluginAPI;
};

export type TranspilerAPI = {
    worker: () => Worker;
    dependencies?: string[];
};

type additionalTranspile = {
    styles: any[];
    html: any[];
};

export type TranspilerFactoryResult = {
    context: PluginContext;
    worker: Worker;
    extensions: string[];
    dependencyTranspilers?: string[];
    transpile: (file: File) => Promise<any>;
    setContext: (context: PluginContext) => void;
    getDependencyTranspiler: (
        extension: string
    ) => TranspilerFactoryResult | null;
    transpileAdditional: (data: any) => Promise<any>;
};

export type TranspilerFactory = (
    this: TranspilerFactoryResult,
    context: PluginContext
) => TranspilerFactoryResult;

export type PluginAPIasRollupPlugin = {
    name: string;
    resolveId?: RollupResolveIdHook;
    load?: RollupLoadHook;
    transform?: RollupTransformHook;
};

export type PluginManagerPlugin = PluginAPI & { transformed: boolean };

export type PluginManager = {
    packagerContext: PackagerContext;
    setPackagerContext: (context: PackagerContext) => void;
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
    currentTask: any;
    complete: any[];
    errors: any[];
    queue: Function[] | any[];
    awaiters: Function[];
    push: (cb: Function | Promise<any>) => void;
    next: () => void;
    callAWaiters: () => void;
    wait: () => Promise<void>;
};
