import { File } from "packager/types/packager";
import { SourceMap } from "rollup";

export type PluginContext = {
    files: File[];
};
export type PluginResolverResult =
    | { id: string }
    | string
    | null
    | false
    | undefined;
export type PluginResolverHook = (
    this: PluginContext,
    moduleId: string,
    parentId: string
) => Promise<PluginResolverResult> | PluginResolverResult;

export type PluginLoaderResult = string | { id: string };
export type PluginLoaderHook = (
    this: PluginContext,
    moduleId: string
) => Promise<PluginLoaderResult> | PluginLoaderResult;

export type PluginTransformerResult = string | { id: string; map: SourceMap };
export type PluginTransformerHook = (
    this: PluginContext,
    code: string,
    moduleId: string
) => Promise<PluginTransformerResult> | PluginTransformerResult;

export type PluginAPIName = string;

export type PluginAPI = {
    name: PluginAPIName;
    worker?: Worker;
    resolver?: PluginResolverHook;
    loader?: PluginLoaderHook;
    transformer?: PluginTransformerHook;
};

export type PluginHook =
    | PluginResolverHook
    | PluginLoaderHook
    | PluginTransformerHook;

export type PluginAPIArg = PluginAPIName | Worker | PluginHook;

export type PluginAPIHooks = {
    resolver?: PluginResolverHook;
    loader?: PluginLoaderHook;
    transformer?: PluginTransformerHook;
};

export type PluginFactoryResult = {
    name: string;
    worker?: Worker;
    hooks?: PluginAPIHooks;
};

export type PluginManager = {
    registerPlugin: (plugin: PluginAPI) => void;
    getRegisteredPlugins: (
        asArray: boolean
    ) => PluginAPI[] | { [key: string]: PluginAPI };
};

export const pluginHooksMap: { [key: string]: string } = {
    resolver: "resolveId",
    loader: "load",
    transform: "transformer"
};
export const pluginHooks = ["resolver", "loader", "transformer"];
