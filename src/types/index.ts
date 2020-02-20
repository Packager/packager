import {
    Plugin,
    ResolveIdHook as RollupResolveIdHook,
    ResolveIdResult as RollupResolveIdResult,
    LoadHook as RollupLoadHook,
    LoadResult as RollupLoadResult,
    TransformHook as RollupTransformHook,
    TransformResult as RollupTransformResult
} from "rollup";
import QueueSystem from "packager/shared/queue-system";
import { ApplicationCache } from "packager/shared/application-cache";

export type PackagerOptions = {
    sourcemaps: boolean;
};

export type File = {
    name: string;
    path: string;
    entry: boolean;
    code: string;
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
    this: PluginContext,
    moduleId: string,
    parentId?: string
) => Promise<PluginResolverResult> | PluginResolverResult;

export type PluginLoaderResult = { id: string } | string | null | void;
export type PluginLoaderHook = (
    this: PluginContext,
    moduleId: string
) => Promise<PluginLoaderResult> | PluginLoaderResult;

export type PluginBeforeBundleHookResult = string | void;
export type PluginBeforeBundleHook = (
    code: string
) => Promise<PluginBeforeBundleHookResult> | PluginBeforeBundleHookResult;

export type PluginHook =
    | PluginResolverHook
    | PluginLoaderHook
    | PluginBeforeBundleHook;

export type PluginAPI = {
    name: string;
    extensions: string[];
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
    getRegisteredPlugins: (
        asArray: boolean
    ) => PluginAPI[] | { [key: string]: PluginAPI };
};
