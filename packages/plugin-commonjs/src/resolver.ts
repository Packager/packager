import { PluginResolverResult, PluginContext } from "packager";
import { resolveRelative } from "packager-shared";

import { HELPERS_ID, PROXY_SUFFIX, getIdFromProxyId } from "./utils";

export default function(
    this: PluginContext,
    moduleId: string,
    parentId?: string
) {
    if (moduleId.endsWith(PROXY_SUFFIX)) {
        moduleId = getIdFromProxyId(moduleId);
    }

    if (moduleId.startsWith("\0")) {
        if (moduleId === HELPERS_ID) {
            return moduleId;
        }

        throw new Error(
            `${moduleId} contains "\\0" which is not yet supported.`
        );
    }

    if (parentId && parentId.endsWith(PROXY_SUFFIX)) {
        let tempParentId = getIdFromProxyId(parentId);

        if (moduleId === tempParentId) {
            return false;
        }
    }

    return null;
}
