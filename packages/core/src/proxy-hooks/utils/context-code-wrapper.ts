import { PluginContext as RollupPluginContext, AcornNode } from "rollup";
import {
  nodeHasDefaultExport,
  nodeHasNamedExports,
} from "packager-pluginutils";
import { walk } from "estree-walker";

export type ObjectProperty = {
  end: number;
  start: number;
  name?: string;
  type: string;
  object?: ObjectProperty;
  property?: ObjectProperty;
};

export type Node = AcornNode & {
  expression: Node;
  operator?: string;
  callee?: ObjectProperty;
  left?: Node & ObjectProperty;
  right?: Node & ObjectProperty;
  object?: ObjectProperty;
  property?: ObjectProperty;
  declaration?: ObjectProperty;
  specifiers?: Array<NodeSpecifier>;
};

export type NodeSpecifier = {
  end: number;
  exported: ObjectProperty;
  local: ObjectProperty;
  start: number;
  type: string;
};

export type ParentNode = {
  body: Array<Node>;
  end: number;
  sourceType: string;
  start: number;
  type: string;
};

export type DefaultExport = {
  defaultExport: string;
  code: string;
};

export type NamedExports = {
  namedExports: Record<string, string>;
  code: string;
};

const getDefaultExport = (moduleId: string, node: Node): DefaultExport => {
  if (nodeHasDefaultExport(node)) {
    let defaultExport = node.declaration.name;

    if (!defaultExport) {
      const objectName = node.declaration?.object?.name;
      const propertyName = node.declaration?.property?.name;

      if (objectName && propertyName) {
        defaultExport = `${objectName}.${propertyName}`;
      } else if (objectName) {
        defaultExport = objectName;
      } else {
        defaultExport = propertyName;
      }
    }

    return {
      defaultExport,
      code: `\n\n window.__PACKAGER_CONTEXT__.npmDependencies['${moduleId}'] = ${defaultExport};`,
    };
  }

  return null;
};

const getNamedExports = (
  moduleId: string,
  node: Node,
  parentNode: ParentNode
): NamedExports => {
  if (
    nodeHasNamedExports(node) &&
    parentNode.body.find((n) => !nodeHasDefaultExport(n))
  ) {
    if (!node.specifiers?.length) {
      return null;
    }

    const inlinedExports = node.specifiers
      .map((spec) =>
        spec.local.name === "default"
          ? spec.local.name === spec.exported.name
            ? `${spec.exported.name}`
            : `${spec.local.name}: ${spec.exported.name}`
          : spec.local.name === spec.exported.name
          ? `${spec.exported.name}`
          : `${spec.exported.name}: ${spec.local.name}`
      )
      .join(", ");

    const namedExports = node.specifiers.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.local.name]: curr.exported.name,
      }),
      {}
    );

    return {
      namedExports,
      code: `\n\n window.__PACKAGER_CONTEXT__.npmDependencies['${moduleId}'] = { ${inlinedExports} };`,
    };
  }

  return null;
};

/**
 * 1. if we don't have any exports, return an empty string
 * 2. if we have a default export but not named exports, return the defaultExport code
 * 3. if we have any named exports but no default, return the namedExports code
 * 4. if we have both, we need to combine them.
 *
 * @todo need to figure out how to include the defaultExport in the export object
 * because at the moment, if there is:
 *
 * import react from './react';
 * export default react;
 *
 * we will add the literal (lowercase) react into the export object and that wouldn't work because
 * it's React we want
 * Maybe it's best if we look at current named exports to figure this out.
 */
const generateExport = (
  defaultExport: DefaultExport,
  namedExports: NamedExports
) => {
  if (!defaultExport && !namedExports) {
    return "";
  }

  if (defaultExport && !namedExports) {
    return defaultExport.code;
  }

  if (!defaultExport && namedExports) {
    return namedExports.code;
  }

  return namedExports.code.replace(`};`, `, ${defaultExport.defaultExport} };`);
};

/**
 * This util wraps the code in a way so that
 * on evaluation, the exported default is added to the
 * packager context on the window object.
 */
export default function (
  moduleId: string,
  code: string,
  rollupPluginContext: RollupPluginContext
) {
  const parentNode = rollupPluginContext.parse(code, {}) as ParentNode;

  let defaultExport: DefaultExport;
  let namedExports: NamedExports;

  walk(rollupPluginContext.parse(code, {}), {
    enter(node: Node) {
      if (!defaultExport) {
        defaultExport = getDefaultExport(moduleId, node);
      }

      if (!namedExports) {
        namedExports = getNamedExports(moduleId, node, parentNode);
      }
    },
  });

  const packagerExport = generateExport(defaultExport, namedExports);

  return code ? `${code} \n\n ${packagerExport}` : null;
}
