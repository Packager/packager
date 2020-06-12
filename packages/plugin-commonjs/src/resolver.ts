import { PluginContext } from "rollup";

import {
  DYNAMIC_JSON_PREFIX,
  DYNAMIC_PACKAGES_ID,
  getExternalProxyId,
  getIdFromProxyId,
  getProxyId,
  HELPERS_ID,
  PROXY_SUFFIX,
} from "./utils/helpers";

export default function (
  this: PluginContext,
  moduleId: string,
  parentId: string
) {
  const isProxyModule = moduleId.endsWith(PROXY_SUFFIX);
  if (isProxyModule) {
    moduleId = getIdFromProxyId(moduleId);
  } else if (moduleId.startsWith("\0")) {
    if (
      moduleId === HELPERS_ID ||
      moduleId === DYNAMIC_PACKAGES_ID ||
      moduleId.startsWith(DYNAMIC_JSON_PREFIX)
    ) {
      return moduleId;
    }
    return null;
  }

  if (moduleId.startsWith(DYNAMIC_JSON_PREFIX)) {
    return moduleId;
  }

  if (parentId && parentId.endsWith(PROXY_SUFFIX)) {
    parentId = getIdFromProxyId(parentId);
  }

  if (isProxyModule) {
    return getExternalProxyId(moduleId);
  }

  return this.resolve(moduleId, parentId, { skipSelf: true }).then(
    (resolved) => {
      if (isProxyModule) {
        if (!resolved) {
          return { id: getExternalProxyId(moduleId), external: false };
        }
        resolved.id = (resolved.external ? getExternalProxyId : getProxyId)(
          resolved.id
        );
        resolved.external = false;
        return resolved;
      }
      return resolved;
    }
  );
}
