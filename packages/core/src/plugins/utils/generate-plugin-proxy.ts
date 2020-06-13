import { Plugin as RollupPlugin } from "rollup";
import {
  resolverProxyHook,
  loaderProxyHook,
  transformerProxyHook,
} from "../../proxy-hooks";
import { Plugin } from "../../types";

const generateRollupPluginProxy = (plugin: Plugin): RollupPlugin => {
  const rollupPlugin = {
    name: plugin.name,
    resolveId: plugin.resolver ? resolverProxyHook(plugin) : undefined,
    load: plugin.loader ? loaderProxyHook(plugin) : undefined,
    transform: plugin.transpiler ? transformerProxyHook(plugin) : undefined,
  } as RollupPlugin;

  return rollupPlugin;
};

export default generateRollupPluginProxy;
