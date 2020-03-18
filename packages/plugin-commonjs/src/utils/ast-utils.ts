/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */

export const operators: any = {
  "==": (x: any) => equals(x.left, x.right, false),

  "!=": (x: any) => not(operators["=="](x)),

  "===": (x: any) => equals(x.left, x.right, true),

  "!==": (x: any) => not(operators["==="](x)),

  "!": (x: any) => isFalsy(x.argument),

  "&&": (x: any) => isTruthy(x.left) && isTruthy(x.right),

  "||": (x: any) => isTruthy(x.left) || isTruthy(x.right)
};

export const extractors: any = {
  Identifier(names: string[], node: any) {
    names.push(node.name);
  },

  ObjectPattern(names: string[], node: any) {
    node.properties.forEach((prop: any) => {
      getExtractor(prop.value.type)(names, prop.value);
    });
  },

  ArrayPattern(names: string[], node: any) {
    node.elements.forEach((element: any) => {
      if (!element) return;
      getExtractor(element.type)(names, element);
    });
  },

  RestElement(names: string[], node: any) {
    getExtractor(node.argument.type)(names, node.argument);
  },

  AssignmentPattern(names: string[], node: any) {
    getExtractor(node.left.type)(names, node.left);
  },
  MemberExpression() {}
};

export const flatten = (node: any) => {
  const parts = [];

  while (node.type === "MemberExpression") {
    if (node.computed) return null;

    parts.unshift(node.property.name);
    // eslint-disable-next-line no-param-reassign
    node = node.object;
  }

  if (node.type !== "Identifier") return null;

  const { name } = node;
  parts.unshift(name);

  return { name, keypath: parts.join(".") };
};

export const extractNames = (node: any) => {
  const names: string[] = [];
  extractors[node.type](names, node);
  return names;
};

export const getExtractor = (type: any) => {
  const extractor = extractors[type];
  if (!extractor) throw new SyntaxError(`${type} pattern not supported.`);
  return extractor;
};

export const isTruthy = (node: any): any => {
  if (node.type === "Literal") return !!node.value;
  if (node.type === "ParenthesizedExpression") return isTruthy(node.expression);
  if (node.operator in operators) return operators[node.operator](node);
  return undefined;
};

export const isFalsy = (node: any) => {
  return not(isTruthy(node));
};

export const not = (value: any) => {
  return value === undefined ? value : !value;
};

export const equals = (a: any, b: any, strict: boolean) => {
  if (a.type !== b.type) return undefined;
  // eslint-disable-next-line eqeqeq
  if (a.type === "Literal")
    return strict ? a.value === b.value : a.value == b.value;
  return undefined;
};

export const isReference = (node: any, parent: any): any => {
  if (node.type === "MemberExpression") {
    return !node.computed && isReference(node.object, node);
  }
  if (node.type === "Identifier") {
    if (!parent) return true;
    switch (parent.type) {
      // disregard `bar` in `foo.bar`
      case "MemberExpression":
        return parent.computed || node === parent.object;
      // disregard the `foo` in `class {foo(){}}` but keep it in `class {[foo](){}}`
      case "MethodDefinition":
        return parent.computed;
      // disregard the `bar` in `{ bar: foo }`, but keep it in `{ [bar]: foo }`
      case "Property":
        return parent.computed || node === parent.value;
      // disregard the `bar` in `export { foo as bar }` or
      // the foo in `import { foo as bar }`
      case "ExportSpecifier":
      case "ImportSpecifier":
        return node === parent.local;
      // disregard the `foo` in `foo: while (...) { ... break foo; ... continue foo;}`
      case "LabeledStatement":
      case "BreakStatement":
      case "ContinueStatement":
        return false;
      default:
        return true;
    }
  }
  return false;
};
