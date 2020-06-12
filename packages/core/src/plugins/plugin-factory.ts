import { registerPlugins, getPlugins } from "./plugin-manager";
import { resolverPlugin, loaderPlugin } from "./base-plugins";
import { packagerContext } from "../utils";

const pluginFactory = () => {
  registerPlugins([resolverPlugin, loaderPlugin]);

  const { rollup } = getPlugins();

  return rollup;
};

export default pluginFactory;
