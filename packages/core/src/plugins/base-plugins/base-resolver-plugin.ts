import {
    isModuleExternal,
    resolveRelativeExternal,
    resolveRelative
} from "packager-shared";

import { createPlugin } from "../plugin-creator";

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

            if (pkgPath) {
                return {
                    id: pkgPath.substr(1)
                };
            }

            return null;
        }

        throw new Error(`Could not resolve '${moduleId}' from '${parentId}'`);
    }
});

export default baseResolverPlugin;
