import { PackagerContext } from "packager";

import path from "./path";

/**
 * Should be used when you want to resolve relatively an external dependency.
 *
 * As an example,
 *  if you have a child path: ./cjs/react.development.js
 *  and a parent path: react
 *
 * This would be resolved as react/cjs/react.development.js and this is the
 * right format for Packager.
 *
 * @param childPath
 * @param parentPath
 * @param context
 */
const resolveExternal = (
  childPath: string,
  parentPath: string,
  context: PackagerContext
): string => {
  if (!parentPath.startsWith("@")) {
    if (!!~parentPath.indexOf("/")) {
      const cachedParent = context.dependencies.get(parentPath);
      if (cachedParent) {
        const relativeExternalUrl = new URL(cachedParent.meta.url).pathname;

        return path.resolve(path.dirname(relativeExternalUrl), childPath);
      }

      return path
        .resolve(path.dirname(`/${parentPath}`), childPath)
        .replace(/^\.\//, "");
    }

    return path.resolve(`/${parentPath}`, childPath);
  }

  throw new Error(
    `Module ${childPath} has a parent ${parentPath} with @ which is currently not supported.`
  );
};

export default resolveExternal;
