import { isModuleExternal, resolveRelative, path } from "packager-shared";

import { createPlugin } from "../plugin-creator";
import { PackagerContext } from "../../../types";

const resolveRelativeExternal = (
    childPath: string,
    parentPath: string,
    context: PackagerContext
) => {
    if (!parentPath.startsWith("@")) {
        if (!!~parentPath.indexOf("/")) {
            const cachedParent = context.cache.dependencies.get(parentPath);
            if (cachedParent) {
                const relativeExternalUrl = new URL(cachedParent.meta.url)
                    .pathname;

                return path.resolve(
                    path.dirname(relativeExternalUrl),
                    childPath
                );
            }

            return path
                .resolve(path.dirname(`/${parentPath}`), childPath)
                .replace(/^\.\//, "");
        }

        return path.resolve(`/${parentPath}`, childPath);
    }

    throw new Error(`Module ${childPath} has a parent ${parentPath} with @.`);
};

const baseResolverPlugin = createPlugin({
    name: "base-resolver",
    resolver(moduleId: string, parentId?: string) {
        if (!parentId) return moduleId;

        if (isModuleExternal(moduleId)) return moduleId;

        const relativePath = <string | null>(
            resolveRelative(moduleId, parentId, this.packagerContext)
        );

        if (relativePath) return relativePath;

        if (isModuleExternal(parentId)) {
            const pkgPath = resolveRelativeExternal(
                moduleId,
                parentId,
                this.packagerContext
            );

            return {
                id: pkgPath.substr(1)
            };
        }

        throw new Error(`Could not resolve '${moduleId}' from '${parentId}'`);
    }
});

export default baseResolverPlugin;
