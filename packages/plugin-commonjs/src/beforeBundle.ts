import { PackagerContext, PluginBeforeBundleHookResult } from "packager";
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
    console.log("inside before bundle hook", {
        code,
        modulePath
    });

    if (isNotTransformable(modulePath)) return null;

    console.log("beforeBundleHook", {
        code,
        modulePath
    });

    const cachedDependency = this.cache.dependencies.get(modulePath);
    if (cachedDependency && cachedDependency.transformedCode) {
        code = `const __default = window.__dependencies['${modulePath}']; export default __default;`;

        return { code, syntheticNamedExports: true };
    }

    const options: any = {};
    const ignoreGlobal = true;
    const sourceMap = true;
    const allowDynamicRequire = true;
    const ignoreRequire =
        typeof options.ignore === "function"
            ? options.ignore
            : Array.isArray(options.ignore)
            ? (modulePath: string) => options.ignore.includes(modulePath)
            : () => false;
    const customNamedExports: any = {};

    const { isEsModule, hasDefaultExport, ast } = checkEsModule(
        // @ts-ignore
        this.parser,
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
    if (!hasCjsKeywords(code, ignoreGlobal)) {
        this.cache.esModulesWithoutDefaultExport.add(modulePath);
        return null;
    }

    console.log("hasCjs");

    const normalizedId = path.normalize(modulePath);
    const isEntry = this.files.find(f => f.path === modulePath && f.entry);
    const transformed = await performTransformation(
        // @ts-ignore
        this.parser,
        code,
        modulePath,
        // @ts-ignore
        Boolean(isEntry),
        ignoreGlobal,
        ignoreRequire,
        customNamedExports[normalizedId],
        sourceMap,
        allowDynamicRequire,
        ast
    );

    console.log("transformed", { transformed });

    setIsCjsPromise(modulePath, Boolean(transformed));

    if (transformed) {
        this.cache.dependencies.update(modulePath, {
            transformedCode: transformed.code
        });

        return transformed.code || "";

        // return {
        //     code: transformed.code || "",
        //     map: transformed.map || { mappings: "" },
        //     syntheticNamedExports: true
        // };
    }
}
