import { dirname, resolve } from "../utils/path";
import {
    PackagerContext,
    File,
    Resolver,
    ResolveResult
} from "../types/packager";

export const resolveRelative = (
    childPath: string,
    parentPath: string,
    context: PackagerContext
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

    const resolved = resolve(dirname(parentPath), childPath).replace(
        /^\.\//,
        ""
    );

    if (context.files.find(f => f.path === resolved)) return resolved;

    const absolute = resolve(dirname(parentPath), childPath);
    const retriedFile = retryFileFind(absolute) || { path: null };

    return retriedFile.path;
};

const resolveRelativeExternal = (childPath: string, parentPath: string) => {
    if (!parentPath.startsWith("@")) {
        if (!!~parentPath.indexOf("/")) {
            return resolve(dirname(`/${parentPath}`), childPath).replace(
                /^\.\//,
                ""
            );
        }

        return resolve(`/${parentPath}`, childPath);
    }

    throw new Error(`Module ${childPath} has a parent ${parentPath} with @.`);
};

export default function dependencyResolver(context: PackagerContext): Resolver {
    const isExternal = (modulePath: string) => !modulePath.startsWith(".");

    return {
        name: "dependency-resolver",
        resolveId(modulePath: string, parent?: string): ResolveResult {
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
