import { packagerContext } from "packager";
import { path, verifyExtensions } from "packager-pluginutils";
import { walk } from "estree-walker";
import { Node } from "./types";

/**
 * Check for module.exports
 */
const isModuleExports = (node: Node) =>
  node.type === "ExpressionStatement" &&
  node.expression?.left?.object?.name === "module" &&
  node.expression?.left?.object?.type === "Identifier" &&
  node.expression?.left?.property?.name === "exports" &&
  node.expression?.left?.property?.type === "Identifier";

/**
 * Check for require('...)
 */
const isRequireStatement = (node: Node) =>
  node.type === "CallExpression" &&
  node.callee?.name === "require" &&
  node.callee?.type === "Identifier";

/**
 * Check for exports.XYZ
 */
const isSingleExports = (node: Node) =>
  node.type === "ExpressionStatement" &&
  node.expression?.operator === "=" &&
  node.expression?.left?.object?.name === "exports" &&
  node.expression?.left?.object?.type === "Identifier";

/**
 * Check for module.exports.namedExport
 */
const isNamedExport = (node: Node) =>
  node.type === "AssignmentExpression" &&
  node.operator === "=" &&
  node.left?.object?.object?.name === "module" &&
  node.left?.object?.object?.type === "Identifier" &&
  node.left?.object?.property?.name === "exports" &&
  node.left?.object?.property?.type === "Identifier" &&
  node.left?.property.type === "Identifier";

/**
 * Checks for define.amd
 *
 * @todo this could potentially cause some unwanted issues.
 * probably better to explore a different way of checking for UMD builds.
 */
const isUmdBuild = (node: Node) =>
  node.type === "MemberExpression" &&
  node.object.name === "define" &&
  node.object.type === "Identifier" &&
  node.property.name === "amd" &&
  node.property.type === "Identifier";

const allowedExtensions = [".js"];
const isModuleSkippable = (moduleId: string) =>
  (path.extname(moduleId) && !verifyExtensions(allowedExtensions)(moduleId)) ||
  (!path.extname(moduleId) &&
    packagerContext.files.find((f) => f.path !== moduleId));

export default function (moduleId: string, code: string): boolean {
  let allow = false;

  /**
   * if the moduleId has an extension but it's not one of the allowed ones,
   * we don't want to do anything with it.
   *
   * if the moduleId doesn't have an extension and is not one of our files,
   * it is most likely an external dependency such as 'vue' or 'react'.
   */
  if (isModuleSkippable(moduleId)) {
    return false;
  }

  walk(packagerContext.parser(code), {
    enter(node: Node) {
      if (allow) {
        this.skip();
      }

      if (isModuleExports(node)) {
        allow = true;
      }

      if (isRequireStatement(node)) {
        allow = true;
      }

      if (isSingleExports(node)) {
        allow = true;
      }

      if (isNamedExport(node)) {
        allow = true;
      }

      if (isUmdBuild(node)) {
        allow = true;
      }
    },
  });

  return allow;
}
