/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */

import {
    getExternalProxyId,
    getIdFromProxyId,
    getProxyId,
    HELPERS_ID,
    PROXY_SUFFIX
} from "packager/transformers/commonjs/utils/helpers";
import { sep, resolve, dirname } from "packager/shared/path";

import { PackagerContext, Resolver, ResolveResult } from "packager/types";

function getCandidatesForExtension(resolved: string, extension: string) {
    return [resolved + extension, `${resolved}${sep}index${extension}`];
}

function getCandidates(resolved: string, extensions: string[]) {
    return extensions.reduce(
        (paths, extension) =>
            paths.concat(getCandidatesForExtension(resolved, extension)),
        [resolved]
    );
}

export default function commonjsResolver(context: PackagerContext): Resolver {
    const extensions = [".js"];

    function resolveExtensions(importee: any, importer: any) {
        if (importee[0] !== "." || !importer) return null;

        const resolved = resolve(dirname(importer), importee);
        const candidates = getCandidates(resolved, extensions);

        for (let i = 0; i < candidates.length; i += 1) {
            try {
                console.log("found candidate!");
            } catch (err) {
                /* noop */
            }
        }

        return null;
    }

    return {
        name: "packager::resolver::commonjs-resolver",
        resolveId(importee: string, importer?: string): ResolveResult {
            const isProxyModule = importee.endsWith(PROXY_SUFFIX);
            if (isProxyModule) {
                importee = getIdFromProxyId(importee);
            } else if (importee.startsWith("\0")) {
                if (importee === HELPERS_ID) {
                    return importee;
                }
                return null;
            }

            if (importer && importer.endsWith(PROXY_SUFFIX)) {
                importer = getIdFromProxyId(importer);
            }

            // @ts-ignore
            return this.resolve(importee, importer, { skipSelf: true }).then(
                (resolved: any) => {
                    if (!resolved) {
                        resolved = resolveExtensions(importee, importer);
                    }
                    if (isProxyModule) {
                        if (!resolved) {
                            return {
                                id: getExternalProxyId(importee),
                                external: false
                            };
                        }
                        resolved.id = (resolved.external
                            ? getExternalProxyId
                            : getProxyId)(resolved.id);
                        resolved.external = false;
                        return resolved;
                    }
                    return resolved;
                }
            );
        }
    };
}
