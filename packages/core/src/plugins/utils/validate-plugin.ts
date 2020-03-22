import { PluginAPI } from "../../../types";

export const MISSING_NAME_FIELD = `'name' is a required field on a plugin.`;
export const MISSING_FIELD = (pluginName: string, field: string) =>
  `${pluginName} is missing '${field}'.`;

export default (plugin: PluginAPI): void | never => {
  if (!plugin.name) {
    throw new Error(MISSING_NAME_FIELD);
  }
};
