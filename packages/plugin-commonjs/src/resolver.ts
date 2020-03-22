import { PluginResolverResult, PluginContext } from "packager";
import {
  resolveRelativeExternal,
  resolveRelative,
  isModuleExternal
} from "packager-shared";

import { HELPERS_ID, PROXY_SUFFIX, getIdFromProxyId } from "./utils";

export default function(
  this: PluginContext,
  moduleId: string,
  parentId?: string
): PluginResolverResult {
  if (!this.meta.has("esModulesWithDefaultExport")) {
    this.meta.set("esModulesWithDefaultExport", new Set());
  }

  if (!this.meta.has("esModulesWithoutDefaultExport")) {
    this.meta.set("esModulesWithoutDefaultExport", new Set());
  }

  if (!this.meta.has("proxyModules")) {
    this.meta.set("proxyModules", new Map());
  }

  if (moduleId.endsWith(PROXY_SUFFIX)) {
    let tempModuleId = getIdFromProxyId(moduleId);
    if (!this.meta.get("proxyModules").has(moduleId)) {
      this.meta.set(
        "proxyModules",
        this.meta.get("proxyModules").set(moduleId, {
          raw: moduleId,
          clean: tempModuleId,
          parent: parentId
        })
      );
    }
  } else if (moduleId.startsWith("\0")) {
    if (moduleId === HELPERS_ID) {
      return moduleId;
    }

    throw new Error(`${moduleId} contains "\\0" which is not yet supported.`);
  }

  if (parentId && parentId.endsWith(PROXY_SUFFIX)) {
    let tempParentId = getIdFromProxyId(parentId);

    if (moduleId === tempParentId && tempParentId.startsWith(".")) {
      const proxyModule = this.meta.get("proxyModules").get(parentId);
      if (proxyModule && isModuleExternal(proxyModule.parent)) {
        const resolvedRelative = resolveRelativeExternal(
          tempParentId,
          proxyModule.parent,
          this.packagerContext
        );

        if (resolvedRelative) {
          return resolvedRelative.substr(1);
        }
      } else {
        const resolvedRelative = resolveRelative(
          tempParentId,
          proxyModule.parent,
          this.packagerContext
        );

        if (resolvedRelative) {
          return resolvedRelative as string;
        }
      }
    }
  }

  return null;
}
