import { PluginAPI } from "../shared";

export default (plugin: PluginAPI): PluginAPI => ({
    // Meta
    name: plugin.name,
    extensions: plugin.extensions,
    transpiler: plugin.transpiler,
    // Hooks
    resolver: plugin.resolver,
    loader: plugin.loader,
    beforeRender: plugin.beforeRender
});
