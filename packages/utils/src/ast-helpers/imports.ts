import { Node } from "../module-info/types";

/**
 * import X from ...
 */
export const nodeHasDefaultImports = (node: Node): boolean => {
  if (!node) {
    return false;
  }

  if (node.type === "ImportDeclaration") {
    return Boolean(
      node?.specifiers?.find((spec) => spec.type === "ImportDefaultSpecifier")
    );
  }

  return false;
};

/**
 * import { X } from ...
 * import { X as Y } from ...
 */
export const nodeHasNamedImports = (node: Node): boolean => {
  if (!node) {
    return false;
  }

  if (node.type === "ImportDeclaration") {
    return Boolean(
      node?.specifiers?.find((spec) => spec.type === "ImportSpecifier")
    );
  }

  return false;
};

/**
 * import * as XYZ from ...
 */
export const nodeHasNamespaceImports = (node: Node): boolean => {
  if (!node) {
    return false;
  }

  if (node.type === "ImportDeclaration") {
    return Boolean(
      node?.specifiers?.find((spec) => spec.type === "ImportNamespaceSpecifier")
    );
  }

  return false;
};
