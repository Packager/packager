import { createPlugin } from "packager-pluginutils";
import { resolveExternal, resolveLocal } from "./utils";
import { isModuleExternal } from "../../utils";

/**
 * 1. If parentId doesn't exist, moduleId is an entry file and therefore, we return it.
 * 2. If moduleId is external, we're dealing with a new NPM dependency so we need return it (it'll be handled in a loader plugin).
 * 3. If parentId is external, we're either loading new NPM dependencies from it or its own local files - therefore, we need to return in this format:
 *   3a. If parentId starts with '@', return @{org}/{packageName}/{localPath}
 *   3b. else return {packageName}/{localPath}
 * 4. If moduleId and parentId aren't external, we're dealing with a local import so resolve relatively and return it if it exists in supplied files.
 * 5. If none of the above match, throw an error.
 */
const resolverPlugin = createPlugin({
  name: "packager-base-resolver",
  resolver(moduleId: string, parentId?: string) {
    if (!parentId || isModuleExternal(moduleId)) {
      return moduleId;
    }

    if (isModuleExternal(parentId)) {
      return resolveExternal(moduleId, parentId);
    }

    return resolveLocal(moduleId, parentId);
  },
});

export default resolverPlugin;
