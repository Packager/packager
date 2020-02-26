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

export interface QueueSystem {
    completed: any[];
    push: (
        name: string,
        task: Function,
        options?: QueueSystemTaskOptions
    ) => Promise<any>;
}

export interface QueueSystemScheduler {
    schedule(callback: Function): void;
}

export interface QueueSystemTaskOptions {
    timeout?: number;
    args?: any;
}

export interface QueueSystemCancellationToken {
    cancelled?: boolean;
    reason?: any;
    cancel(reason?: any): void;
}

export interface QueueSystemSequentialTaskQueueOptions {
    name?: string;
    timeout?: number;
    scheduler?: QueueSystemScheduler;
}

export interface QueueSystemCancellablePromiseLike<T> extends PromiseLike<T> {
    cancel(reason?: any): void;
}

export interface QueueSystemTaskEntry {
    name: string;
    args: any[];
    callback: Function;
    timeout?: number;
    timeoutHandle?: any;
    cancellationToken: QueueSystemCancellationToken;
    result?: any;
    resolve?: (value: any | PromiseLike<any>) => void;
    reject?: (reason?: any) => void;
}

export interface QueueSystemTaskEntry {
    name: string;
    args: any[];
    callback: Function;
    timeout?: number;
    timeoutHandle?: any;
    cancellationToken: QueueSystemCancellationToken;
    result?: any;
    resolve?: (value: any | PromiseLike<any>) => void;
    reject?: (reason?: any) => void;
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

export type PackagerContext = {
    cache: {
        dependencies: ApplicationCache;
        transpilers: ApplicationCache;
        esModulesWithDefaultExport: any;
        esModulesWithoutDefaultExport: any;
    };
    transpileQueue: QueueSystem;
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
    extensions: string[];
    allowExternal?: boolean;
    transpiler?: any;
    resolver?: PluginResolverHook;
    loader?: PluginLoaderHook;
    beforeBundle?: PluginBeforeBundleHook;
};

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
    getRegisteredPlugins: (asArray: boolean) => PluginAPI[];
};

export const createPlugin: (options: PluginAPI) => PluginAPI;
