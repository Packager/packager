/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */

import { PackagerContext, Loader, LoadResult } from "packager/types/packager";
import {
    HELPERS,
    HELPERS_ID,
    EXTERNAL_SUFFIX,
    PROXY_SUFFIX,
    getIdFromExternalProxyId,
    getIdFromProxyId,
    getName,
    getIsCjsPromise
} from "packager/transformers/commonjs/utils";

export default function commonjsLoader(context: PackagerContext): Loader {
    return {
        name: "packager::loader::commonjs-loader",
        async load(modulePath: string): Promise<LoadResult> {
            if (modulePath === HELPERS_ID) return HELPERS;

            // generate proxy modules
            if (modulePath.endsWith(EXTERNAL_SUFFIX)) {
                const actualId = getIdFromExternalProxyId(modulePath);
                const name = getName(actualId);

                return `import ${name} from ${JSON.stringify(
                    actualId
                )}; export default ${name};`;
            }

            if (modulePath.endsWith(PROXY_SUFFIX)) {
                const actualId = getIdFromProxyId(modulePath);
                const name = getName(actualId);

                return getIsCjsPromise(actualId).then((isCjs: boolean) => {
                    if (isCjs)
                        return `import { __moduleExports } from ${JSON.stringify(
                            actualId
                        )}; export default __moduleExports;`;
                    else if (
                        context.cache.esModulesWithoutDefaultExport.has(
                            actualId
                        )
                    )
                        return `import * as ${name} from ${JSON.stringify(
                            actualId
                        )}; export default ${name};`;
                    else if (
                        context.cache.esModulesWithDefaultExport.has(actualId)
                    ) {
                        return `export {default} from ${JSON.stringify(
                            actualId
                        )};`;
                    }
                    return `import * as ${name} from ${JSON.stringify(
                        actualId
                    )}; import {getCjsExportFromNamespace} from "${HELPERS_ID}"; export default getCjsExportFromNamespace(${name})`;
                });
            }

            return null;
        }
    };
}
