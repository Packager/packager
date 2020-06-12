import { path } from "packager-pluginutils";
import { packagerContext, isModuleExternal } from "../../../utils";

const retryFileFind = (path: string, moduleId: string) =>
  path === `${moduleId}/index.js` ||
  path === `${moduleId}/index.ts` ||
  path === `${moduleId}/index.jsx` ||
  path === `${moduleId}/index.tsx` ||
  path === `${moduleId}.js` ||
  path === `${moduleId}.ts` ||
  path === `${moduleId}.jsx` ||
  path === `${moduleId}.tsx` ||
  null;

const resolveLocal = (moduleId: string, parentId: string) => {
  if (!isModuleExternal(moduleId) && !isModuleExternal(parentId)) {
    const fullPath = path.resolve(path.dirname(parentId), moduleId);
    const localFile = packagerContext
      .get("files")
      .find(
        (file) => file.path === fullPath || retryFileFind(file.path, fullPath)
      );

    if (!localFile) {
      throw new Error(`Could not resolve '${moduleId}' in '${parentId}'`);
    }

    return localFile.path;
  }

  return null;
};

export default resolveLocal;
