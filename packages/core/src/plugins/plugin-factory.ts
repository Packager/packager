import { registerPlugins, getPlugins } from "./plugin-manager";
import { internalPlugin, resolverPlugin, loaderPlugin } from "./base-plugins";

const pluginFactory = () => {
  registerPlugins([resolverPlugin, loaderPlugin]);

  const { rollup } = getPlugins();

  return [internalPlugin, ...rollup];
};

export default pluginFactory;
