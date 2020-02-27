import { PackagerContext } from "packager";
import { path, isModuleExternal } from "packager-shared";

import performTransformation, {
    checkEsModule,
    hasCjsKeywords
} from "./utils/perform-transform";
import { setIsCjsPromise } from "./utils/is-cjs-promise";

const isNotTransformable = (modulePath: string) =>
    !modulePath.endsWith("?commonjs-proxy") && !isModuleExternal(modulePath);

export default async function(
    this: PackagerContext,
    code: string,
    modulePath: string
) {
    if (isNotTransformable(modulePath)) return null;
    const cachedDependency = this.cache.dependencies.get(modulePath);
    if (cachedDependency && cachedDependency.transformedCode) {
        code = `const __default = window.__dependencies['${modulePath}']; export default __default;`;

        return { code, syntheticNamedExports: true };
    }
    const sourceMap = true;
    const { isEsModule, hasDefaultExport, ast } = checkEsModule(
        this.acornParser,
        code,
        modulePath
    );

    if (isEsModule) {
        (hasDefaultExport
            ? this.cache.esModulesWithDefaultExport
            : this.cache.esModulesWithoutDefaultExport
        ).add(modulePath);
        return null;
    }

    // it is not an ES module but it does not have CJS-specific elements.
    if (!hasCjsKeywords(code)) {
        this.cache.esModulesWithoutDefaultExport.add(modulePath);
        return null;
    }

    const isEntry = this.files.find(f => f.path === modulePath && f.entry);
    const transformed = await performTransformation(
        this.acornParser,
        code,
        modulePath,
        Boolean(isEntry),
        sourceMap,
        ast
    );

    setIsCjsPromise(modulePath, Boolean(transformed));

    if (transformed) {
        this.cache.dependencies.update(modulePath, {
            transformedCode: transformed.code
        });

        return transformed.code || "";
    }
}
