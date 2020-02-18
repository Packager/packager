import { File, PackagerContext } from "packager/types/packager";
import { SourceMap } from "rollup";

export type PluginUtils = {
    verifyExtensions: (
        allowedExtensions: string[]
    ) => (filePath: string) => boolean;
};
export type PluginContext = {
    files: File[];
    utils: PluginUtils;
};
export type PluginContextTransformer = {
    transpiler: any;
} & PluginContext;
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
    extensions: string[];
    transpiler?: any;
    resolver?: PluginResolverHook;
    loader?: PluginLoaderHook;
    beforeRender?: any;
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

export type PluginCreateFactoryResult = {
    name: string;
    extensions: string[];
    transpiler?: any;
    beforeRender?: any;
    // hooks?: PluginAPIHooks;
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
