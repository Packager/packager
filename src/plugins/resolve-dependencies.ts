import { Plugin } from "rollup";
import path from "../utils/path";
import { PluginContext, File } from "./";

export default function resolveDependencies(context: PluginContext): Plugin {
    const isExternal = (modulePath: string) => !modulePath.startsWith(".");

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

    return {
        name: "resolve-dependencies",
        resolveId(modulePath: string, parent?: string) {
            if (!parent) return modulePath;

            if (isExternal(modulePath)) return modulePath;

            const resolved = path
                .resolve(path.dirname(parent), modulePath)
                .replace(/^\.\//, "");

            if (context.files.find(f => f.path === resolved)) return resolved;

            const absolute = path.resolve(path.dirname(parent), modulePath);
            const retriedFile = retryFileFind(absolute);

            if (retriedFile) return retriedFile.path;

            throw new Error(
                `Could not resolve '${modulePath}' from '${parent}'`
            );
        },
        load(modulePath: string) {
            const file = context.files.find(f => f.path === modulePath);

            if (!file) return null;

            return {
                code: file.code
            };
        }
    };
}
