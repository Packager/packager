import { PackagerContext, File } from "packager";
import { path } from "./";

export const resolveRelative = (
    childPath: string,
    parentPath: string,
    context: PackagerContext,
    pathOnly: boolean = true
): File | string | null => {
    const retryFileFind = (path: string): File | null =>
        context.files.find(
            f =>
                f.path === `${path}/index.js` ||
                f.path === `${path}/index.ts` ||
                f.path === `${path}/index.jsx` ||
                f.path === `${path}/index.tsx` ||
                f.path === `${path}.js` ||
                f.path === `${path}.ts` ||
                f.path === `${path}.jsx` ||
                f.path === `${path}.tsx`
        ) || null;

    const resolved = path
        .resolve(path.dirname(parentPath), childPath)
        .replace(/^\.\//, "");

    const foundFile = context.files.find(f => f.path === resolved);

    if (foundFile) return pathOnly ? foundFile.path : foundFile;

    const absolute = path.resolve(path.dirname(parentPath), childPath);
    const retriedFile = retryFileFind(absolute);

    if (!retriedFile) return null;

    return pathOnly ? retriedFile.path || null : retriedFile || null;
};

export default resolveRelative;
