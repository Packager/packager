/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */

import { normalize } from "packager/shared/path";
import isModuleExternal from "packager/shared/is-module-external";
import verifyExtensions from "packager/shared/verify-extensions";
import performTransformation, {
    checkEsModule,
    hasCjsKeywords
} from "./utils/perform-transform";
import { setIsCjsPromise } from "./utils/is-cjs-promise";

import {
    PackagerContext,
    Transformer,
    TransformResult
} from "../../types/packager";

const isNotTransformable = (modulePath: string, couldBeCjs: Function) =>
    !couldBeCjs(modulePath) &&
    !modulePath.endsWith("?commonjs-proxy") &&
    !isModuleExternal(modulePath);

export default function commonjsTransformer(
    context: PackagerContext
): Transformer {
    const transformerName = "packager::transformer::commonjs-transformer";
    const couldBeCjs = verifyExtensions([".js"]);

    return {
        name: transformerName,
        async transform(
            code: string,
            modulePath: string
        ): Promise<TransformResult> {
            if (isNotTransformable(modulePath, couldBeCjs)) return null;

            const cachedDependency = context.cache.dependencies.get(modulePath);
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
                    ? (modulePath: string) =>
                          options.ignore.includes(modulePath)
                    : () => false;
            const customNamedExports: any = {};

            const { isEsModule, hasDefaultExport, ast } = checkEsModule(
                // @ts-ignore
                this.parse,
                code,
                modulePath
            );

            if (isEsModule) {
                (hasDefaultExport
                    ? context.cache.esModulesWithDefaultExport
                    : context.cache.esModulesWithoutDefaultExport
                ).add(modulePath);
                return null;
            }

            // it is not an ES module but it does not have CJS-specific elements.
            if (!hasCjsKeywords(code, ignoreGlobal)) {
                context.cache.esModulesWithoutDefaultExport.add(modulePath);
                return null;
            }

            const normalizedId = normalize(modulePath);

            const transformed = await performTransformation(
                // @ts-ignore
                this.parse,
                code,
                modulePath,
                // @ts-ignore
                this.getModuleInfo(modulePath).isEntry,
                ignoreGlobal,
                ignoreRequire,
                customNamedExports[normalizedId],
                sourceMap,
                allowDynamicRequire,
                ast,
                context
            );

            setIsCjsPromise(modulePath, Boolean(transformed));

            if (transformed) {
                context.cache.dependencies.set(modulePath, {
                    ...context.cache.dependencies.get(modulePath),
                    transformedCode: transformed.code
                });

                return {
                    code: transformed.code || "",
                    map: transformed.map || { mappings: "" },
                    syntheticNamedExports: true
                };
            }
        }
    };
}
