import { PackagerContext, PluginResolverResult } from "packager";

import { HELPERS_ID, PROXY_SUFFIX, getIdFromProxyId } from "./utils";

export default function(
    this: PackagerContext,
    moduleId: string,
    parentId?: string
): PluginResolverResult {
    if (moduleId.endsWith(PROXY_SUFFIX)) {
        moduleId = getIdFromProxyId(moduleId);
    } else if (moduleId.startsWith("\0")) {
        if (moduleId === HELPERS_ID) {
            return moduleId;
        }
        return null;
    }

    if (parentId && parentId.endsWith(PROXY_SUFFIX)) {
        parentId = getIdFromProxyId(parentId);
    }

    return null;
}
