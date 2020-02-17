const plugins = new Map();

const bindContextToHooks = (context: any, hooks: any) =>
    hooks
        ? Object.keys(hooks).reduce((acc: any, curr: any) => {
              const boundHook = hooks[curr].bind(context);
              return { ...acc, [curr]: boundHook };
          }, {})
        : null;

export const pluginManager = (files: any) => {
    const context = { files };

    return {
        registerPlugin(plugin: any) {
            const hooks = bindContextToHooks(context, plugin.hooks);

            plugins.set(plugin.name, { ...plugin, ...hooks });
        },
        getPlugins() {
            return Array.from(plugins.entries()).reduce(
                (acc, val) => ({
                    ...acc,
                    [val[0]]: val[1] || null
                }),
                {}
            );
        }
    };
};
