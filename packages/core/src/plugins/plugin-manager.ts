import { Plugin as RollupPlugin } from "rollup";
import { packagerContext } from "../utils";
import { PluginManager, Plugin } from "../types";
import {
  resolverProxyHook,
  loaderProxyHook,
  transformerProxyHook,
} from "../proxy-hooks";

const generateRollupPluginProxy = (plugin: Plugin): RollupPlugin =>
  ({
    name: plugin.name,
    resolveId: plugin.resolver ? resolverProxyHook(plugin) : undefined,
    load: plugin.loader ? loaderProxyHook(plugin) : undefined,
    transform: plugin.transpiler ? transformerProxyHook(plugin) : undefined,
  } as RollupPlugin);

const registerSinglePlugin = ({ rollup, raw }, plugin: Plugin) => {
  if (!rollup) {
    packagerContext.set(
      "_rollupPlugins",
      packagerContext
        .get("_rollupPlugins")
        .set(plugin.name, generateRollupPluginProxy(plugin))
    );
  }

  if (!raw) {
    packagerContext.set(
      "plugins",
      packagerContext.get("plugins").set(plugin.name, plugin)
    );
  }
};

export const registerPlugins = (plugins: Array<Plugin> | Plugin): void => {
  if (!plugins) {
    return;
  }

  if (!Array.isArray(plugins)) {
    const { rollup, raw } = getPlugins(plugins.name);

    registerSinglePlugin({ rollup, raw }, plugins);
  }

  if (Array.isArray(plugins) && plugins.length) {
    for (const plugin of plugins) {
      const { rollup, raw } = getPlugins(plugin.name);

      registerSinglePlugin({ rollup, raw }, plugin);
    }
  }
};

export const getPlugins = (name?: string) => {
  if (name) {
    return {
      rollup: packagerContext.get("_rollupPlugins").get(name),
      raw: packagerContext.get("plugins").get(name),
    };
  }

  return {
    rollup: Array.from(packagerContext.get("_rollupPlugins").values()),
    raw: Array.from(packagerContext.get("plugins").values()),
  };
};

const pluginManager = (): PluginManager => {
  return {
    getPlugins,
    registerPlugins,
  };
};

export default pluginManager;
