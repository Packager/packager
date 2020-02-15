import { dirname, resolve } from "packager/shared/path";
import isModuleExternal from "packager/shared/is-module-external";

import {
    PackagerContext,
    File,
    Resolver,
    ResolveResult
} from "../types/packager";

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

    const resolved = resolve(dirname(parentPath), childPath).replace(
        /^\.\//,
        ""
    );

    const foundFile = context.files.find(f => f.path === resolved);

    if (foundFile) return pathOnly ? foundFile.path : foundFile;

    const absolute = resolve(dirname(parentPath), childPath);
    const retriedFile = retryFileFind(absolute);

    if (!retriedFile) return null;

    return pathOnly ? retriedFile.path || null : retriedFile || null;
};

const resolveRelativeExternal = (
    childPath: string,
    parentPath: string,
    context: PackagerContext
) => {
    if (!parentPath.startsWith("@")) {
        if (!!~parentPath.indexOf("/")) {
            const cachedParent = context.cache.dependencies.get(parentPath);
            if (cachedParent) {
                const relativeExternalUrl = new URL(cachedParent.meta.url)
                    .pathname;

                return resolve(dirname(relativeExternalUrl), childPath);
            }

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
    return {
        name: "packager::resolver::dependency-resolver",
        resolveId(modulePath: string, parent?: string): ResolveResult {
            if (!parent) return modulePath;

            if (isModuleExternal(modulePath)) return modulePath;

            const relativePath = <string | null>(
                resolveRelative(modulePath, parent, context)
            );

            if (relativePath) return relativePath;

            if (
                !parent.startsWith(".") ||
                !parent.startsWith("/") ||
                isModuleExternal(parent)
            ) {
                const pkgPath = resolveRelativeExternal(
                    modulePath,
                    parent,
                    context
                );

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
