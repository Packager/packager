import { PluginAPI } from "packager/types";

export default (plugin: PluginAPI): void | never => {
    if (!plugin.name) {
        throw new Error(`'name' is a required field on a plugin.`);
    }

    if (!plugin.extensions) {
        throw new Error(`${plugin.name} is missing 'extensions'.`);
    }
};
