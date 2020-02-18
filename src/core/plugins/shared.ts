import { File } from "packager/types/packager";
import Transpiler from "packager/transpilers";
import { SourceMap } from "rollup";

export type PluginContext = {
    files: File[];
};
export type PluginContextTransformer = {
    files: File[];
    transpiler: any;
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

export type PluginLoaderResult =
    | { id: string }
    | string
    | null
    | false
    | undefined;
export type PluginLoaderHook = (
    this: PluginContext,
    moduleId: string
) => Promise<PluginLoaderResult> | PluginLoaderResult;

export type PluginTransformerResult =
    | { id: string; map: SourceMap }
    | string
    | null
    | false
    | undefined;
export type PluginTransformerHook = (
    this: PluginContextTransformer,
    code: string,
    moduleId: string
) => Promise<PluginTransformerResult> | PluginTransformerResult;

export type PluginAPIName = string;

export type PluginAPI = {
    name: PluginAPIName;
    transpiler?: any;
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
    transpiler?: any;
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
    transformer: "transform"
};
export const pluginHooks = ["resolver", "loader", "transformer"];
