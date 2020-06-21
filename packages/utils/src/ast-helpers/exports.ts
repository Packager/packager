import { Node } from "../module-info/types";

/**
 * export default ...
 * export { default } from ...
 * export { xyz as default };
 *
 * Includes named default named export by default.
 * Set includeNamed to false to ignore the check.
 */
export const nodeHasDefaultExport = (
  node: Node,
  includeNamed: boolean = true
): boolean => {
  if (!node) {
    return false;
  }

  if (node.type === "ExportDefaultDeclaration") {
    return true;
  }

  return includeNamed ? nodeHasNamedExports(node, true) : false;
};

/**
 * export { x }
 * export { x as y }
 * export { default } from ...
 *
 * Doesn't include default named export by default.
 * Set includeDefault to true to include it in the check.
 */
export const nodeHasNamedExports = (
  node: Node,
  includeDefault: boolean = false
) => {
  if (!node) {
    return false;
  }

  if (node.type === "ExportNamedDeclaration") {
    /**
     * if we have named exports but we don't care about
     * default, we can safely return true;
     */
    if (node?.specifiers.length && !includeDefault) {
      return true;
    }

    /**
     * if we care about default and we have named exports we can return true otherwise
     * we undefined will be returned in the find and therefore false.
     */
    return Boolean(
      node?.specifiers?.find((spec) => spec.exported.name === "default")
    );
  }

  return false;
};

/**
 * export * from ...
 */
export const nodeHasExportAll = (node: Node): boolean => {
  if (!node) {
    return false;
  }

  return node.type === "ExportAllDeclaration";
};
