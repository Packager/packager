import { Plugin } from "packager";
import * as pathUtil from "./path";
import * as styleHelpersUtil from "./style-helpers";

export * from "./worker-helpers";
export * from "./consts";

export const path = pathUtil;
export const styleHelpers = styleHelpersUtil;
export const createPlugin = (plugin: Plugin): Plugin => plugin;
export const verifyExtensions = (extensions: Array<string>) => (
  path: string
): boolean => new RegExp(`\\${extensions.join("$|\\")}$`, "i").test(path);

export default {
  verifyExtensions,
  createPlugin,
  path,
  styleHelpers,
};
