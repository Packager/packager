import { PluginContext } from "packager";
import { isModuleExternal } from "packager-shared";

import performTransformation, {
    checkEsModule,
    hasCjsKeywords
} from "./utils/perform-transform";
import { setIsCjsPromise } from "./utils/is-cjs-promise";

const isNotTransformable = (moduleId: string) =>
    !moduleId.endsWith("?commonjs-proxy") && !isModuleExternal(moduleId);

export default async function(
    this: PluginContext,
    code: string,
    moduleId: string
) {
    if (isNotTransformable(moduleId)) return null;

    const cachedDependency = this.packagerContext.cache.dependencies.get(
        moduleId
    );
    const existsOnWindow =
        window.__dependencies && window.__dependencies[moduleId] != null;

    if (cachedDependency && cachedDependency.transformedCode) {
        if (!existsOnWindow) {
            return cachedDependency.transformedCode;
        }

        return `const __default = window.__dependencies['${moduleId}']; export default __default;`;
    }

    const sourceMap = true;
    const { isEsModule, hasDefaultExport, ast } = checkEsModule(
        this.packagerContext.acornParser,
        code,
        moduleId
    );

    if (isEsModule) {
        (hasDefaultExport
            ? this.packagerContext.cache.esModulesWithDefaultExport
            : this.packagerContext.cache.esModulesWithoutDefaultExport
        ).add(moduleId);
        return null;
    }

    // it is not an ES module but it does not have CJS-specific elements.
    if (!hasCjsKeywords(code)) {
        this.packagerContext.cache.esModulesWithoutDefaultExport.add(moduleId);
        return null;
    }

    const isEntry = this.packagerContext.files.find(
        f => f.path === moduleId && f.entry
    );
    const transformed = await performTransformation(
        this.packagerContext.acornParser,
        code,
        moduleId,
        Boolean(isEntry),
        sourceMap,
        ast
    );

    setIsCjsPromise(moduleId, Boolean(transformed));

    if (transformed) {
        this.packagerContext.cache.dependencies.update(moduleId, {
            transformedCode: transformed.code
        });

        return transformed.code || "";
    }
}
