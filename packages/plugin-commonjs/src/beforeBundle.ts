import { PackagerContext } from "packager";
import { isModuleExternal } from "packager-shared";

import performTransformation, {
    checkEsModule,
    hasCjsKeywords
} from "./utils/perform-transform";
import { setIsCjsPromise } from "./utils/is-cjs-promise";

const isNotTransformable = (moduleId: string) =>
    !moduleId.endsWith("?commonjs-proxy") && !isModuleExternal(moduleId);

export default async function(
    this: PackagerContext,
    code: string,
    moduleId: string
) {
    if (isNotTransformable(moduleId)) return null;
    const cachedDependency = this.cache.dependencies.get(moduleId);
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
        this.acornParser,
        code,
        moduleId
    );

    if (isEsModule) {
        (hasDefaultExport
            ? this.cache.esModulesWithDefaultExport
            : this.cache.esModulesWithoutDefaultExport
        ).add(moduleId);
        return null;
    }

    // it is not an ES module but it does not have CJS-specific elements.
    if (!hasCjsKeywords(code)) {
        this.cache.esModulesWithoutDefaultExport.add(moduleId);
        return null;
    }

    const isEntry = this.files.find(f => f.path === moduleId && f.entry);
    const transformed = await performTransformation(
        this.acornParser,
        code,
        moduleId,
        Boolean(isEntry),
        sourceMap,
        ast
    );

    setIsCjsPromise(moduleId, Boolean(transformed));

    if (transformed) {
        this.cache.dependencies.update(moduleId, {
            transformedCode: transformed.code
        });

        return transformed.code || "";
    }
}
