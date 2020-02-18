import {
    PluginAPI,
    PluginCreateFactoryResult,
    PluginTransformerResult
} from "./shared";

export const createPlugin = (args: PluginAPI): PluginCreateFactoryResult => {
    // let pluginProxy = {
    //     name: args.name,
    //     transform: args.transformer
    //         ? new Proxy(args.transformer, transformerHandler)
    //         : null
    // } as any;

    return args;
};

const transformerHandler = {
    apply(target, thisArg, argumentsList: string[]) {
        return Reflect.apply(target, thisArg, argumentsList);
    }
} as ProxyHandler<any>;
