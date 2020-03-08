import { PluginContext } from "packager";
import {
    HELPERS,
    HELPERS_ID,
    EXTERNAL_SUFFIX,
    PROXY_SUFFIX,
    getIdFromExternalProxyId,
    getIdFromProxyId,
    getName,
    getIsCjsPromise
} from "./utils";

export default async function(this: PluginContext, moduleId: string) {
    if (moduleId === HELPERS_ID) return HELPERS;

    if (moduleId.endsWith(EXTERNAL_SUFFIX)) {
        const actualId = getIdFromExternalProxyId(moduleId);
        const name = getName(actualId);

        return `import ${name} from ${JSON.stringify(
            actualId
        )}; export default ${name};`;
    }

    if (moduleId.endsWith(PROXY_SUFFIX)) {
        const actualId = getIdFromProxyId(moduleId);
        const name = getName(actualId);

        return getIsCjsPromise(actualId).then((isCjs: boolean) => {
            if (isCjs)
                return `import { __moduleExports } from ${JSON.stringify(
                    actualId
                )}; export default __moduleExports;`;
            else if (
                this.packagerContext.cache.esModulesWithoutDefaultExport.has(
                    actualId
                )
            )
                return `import * as ${name} from ${JSON.stringify(
                    actualId
                )}; export default ${name};`;
            else if (
                this.packagerContext.cache.esModulesWithDefaultExport.has(
                    actualId
                )
            ) {
                return `export {default} from ${JSON.stringify(actualId)};`;
            }
            return `import * as ${name} from ${JSON.stringify(
                actualId
            )}; import {getCjsExportFromNamespace} from "${HELPERS_ID}"; export default getCjsExportFromNamespace(${name})`;
        });
    }

    return null;
}
