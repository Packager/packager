import { Plugin } from "rollup";
import path from "../utils/path";
import { PluginContext, File } from "./";

export const resolveRelative = (
    childPath: string,
    parentPath: string,
    context: PluginContext
): string | null => {
    const retryFileFind = (path: string): File | undefined =>
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
        );

    const resolved = path
        .resolve(path.dirname(parentPath), childPath)
        .replace(/^\.\//, "");

    if (context.files.find(f => f.path === resolved)) return resolved;

    const absolute = path.resolve(path.dirname(parentPath), childPath);
    const retriedFile = retryFileFind(absolute) || { path: null };

    return retriedFile.path;
};

const resolveRelativeExternal = (childPath: string, parentPath: string) => {
    if (!parentPath.startsWith("@")) {
        if (!!~parentPath.indexOf("/")) {
            return path
                .resolve(path.dirname(`/${parentPath}`), childPath)
                .replace(/^\.\//, "");
        }

        return path.resolve(`/${parentPath}`, childPath);
    }

    throw new Error(`Module ${childPath} has a parent ${parentPath} with @.`);
};

export default function resolveDependencies(context: PluginContext): Plugin {
    const isExternal = (modulePath: string) => !modulePath.startsWith(".");

    return {
        name: "resolve-dependencies",
        resolveId(modulePath: string, parent?: string) {
            if (!parent) return modulePath;

            if (isExternal(modulePath)) return modulePath;

            const relativePath = resolveRelative(modulePath, parent, context);

            if (relativePath) return relativePath;

            if (!parent.startsWith(".") || !parent.startsWith("/")) {
                const pkgPath = resolveRelativeExternal(modulePath, parent);

                return {
                    id: pkgPath.substr(1)
                };
            }

            throw new Error(
                `Could not resolve '${modulePath}' from '${parent}'`
            );
        }
    };
}
