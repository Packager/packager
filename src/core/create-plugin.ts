import {
    SourceMap,
    Plugin,
    ResolveIdHook,
    LoadHook,
    TransformHook
} from "rollup";
import { PackagerContext } from "packager/types/packager";

type PluginResolverResult = string | { id: string } | null | false | undefined;
type PluginResolverHook = (
    this: PackagerContext,
    moduleId: string
) => Promise<PluginResolverResult> | PluginResolverResult;

type PluginLoaderResult = string | { id: string };
type PluginLoaderHook = (
    this: PackagerContext,
    moduleId: string
) => Promise<PluginLoaderResult> | PluginLoaderResult;

type PluginTransformerResult = string | { id: string; map: SourceMap };
type PluginTransformerHook = (
    this: PackagerContext,
    code: string,
    moduleId: string
) => Promise<PluginTransformerResult> | PluginTransformerResult;

type PluginAPI = {
    name: string;
    worker?: Worker;
    resolver?: PluginResolverHook;
    loader?: PluginLoaderHook;
    transformer?: PluginTransformerHook;
};

type PluginAPIHooks = {
    resolver?: PluginResolverHook;
    loader?: PluginLoaderHook;
    transformer?: PluginTransformerHook;
};

const pluginHooksMap: { [key: string]: string } = {
    resolver: "resolveId",
    loader: "load",
    transform: "transformer"
};
const pluginHooks = ["resolver", "loader", "transformer"];

const reducePluginArgs = (pluginArgs: PluginAPI) =>
    Object.keys(pluginArgs).reduce((acc: any, curr: string) => {
        if (curr === "name") {
            return { ...acc, name: pluginArgs["name"] };
        }

        if (curr === "worker") {
            return { ...acc, worker: pluginArgs["worker"] };
        }

        if (pluginHooks.includes(curr)) {
            const hookId = pluginHooksMap[curr];

            return {
                ...acc,
                hooks: {
                    ...acc.hooks,
                    [hookId]: (pluginArgs as any)[curr]
                }
            };
        }

        return acc;
    }, {});

type PluginFactoryResult = {
    name: string;
    worker?: Worker;
    hooks?: PluginAPIHooks;
};

export const createPlugin = (args: PluginAPI): PluginFactoryResult =>
    reducePluginArgs(args);
