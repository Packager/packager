import { PluginAPI } from "../../../types";

export default (plugin: PluginAPI): PluginAPI => ({
    // Meta
    name: plugin.name,
    extensions: plugin.extensions,
    transpiler: plugin.transpiler,
    // Hooks
    resolver: plugin.resolver,
    loader: plugin.loader,
    beforeBundle: plugin.beforeBundle
});
