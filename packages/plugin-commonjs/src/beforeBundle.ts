import { PluginContext } from "packager";
import { isModuleExternal } from "packager-shared";

import performTransformation, {
  checkEsModule,
  hasCjsKeywords
} from "./utils/perform-transform";
import { setIsCjsPromise, reservedWords } from "./utils";

const isNotTransformable = (moduleId: string, code: string) =>
  !moduleId.endsWith("?commonjs-proxy") &&
  !isModuleExternal(moduleId) &&
  !hasCjsKeywords(code);

export default async function(
  this: PluginContext,
  code: string,
  moduleId: string
) {
  if (isNotTransformable(moduleId, code)) return null;

  const cachedDependency = this.packagerContext.dependencies.get(moduleId);
  const existsOnWindow =
    window.__dependencies && window.__dependencies[moduleId] != null;

  if (cachedDependency && cachedDependency.transformedCode) {
    if (!existsOnWindow) {
      return cachedDependency.transformedCode;
    }

    /**
     * We have to export everything from __default in a destructured assingment
     * apart from the reserved keywords. As an example, Vue has a delete function on the
     * Vue instance so when we try to export that, we get a reserved keyword error.
     * However, we are fine to filter those out because they will most likely not even be used.
     */
    const keys = Object.keys(window.__dependencies![moduleId]);
    const reserved = reservedWords.split(" ");
    const exports = keys.length
      ? `export const { ${keys
          .filter(m => !reserved.includes(m))
          .map(m => `${m}`)} } = __default;`
      : "";
    return `const __default = window.__dependencies['${moduleId}']; ${exports} export default __default; `;
  }

  const sourceMap = true;
  const { isEsModule, hasDefaultExport, ast } = checkEsModule(
    this.packagerContext.acornParser,
    code,
    moduleId
  );

  if (isEsModule) {
    const key = hasDefaultExport
      ? "esModulesWithDefaultExport"
      : "esModulesWithoutDefaultExport";

    this.meta.set(key, this.meta.get(key).add(moduleId));
    return null;
  }

  // it is not an ES module but it does not have CJS-specific elements.
  if (!hasCjsKeywords(code)) {
    this.meta.set(
      "esModulesWithoutDefaultExport",
      this.meta.get("esModulesWithoutDefaultExport").add(moduleId)
    );
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
    this.packagerContext.dependencies.update(moduleId, {
      transformedCode: transformed.code
    });

    return transformed.code || "";
  }
}
