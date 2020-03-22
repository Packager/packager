/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */

import { path } from "packager-shared";
import { extractors } from "./ast-utils";
import { walk } from "estree-walker";

export const PROXY_SUFFIX = "?commonjs-proxy";
export const getProxyId = (id: string) => `\0${id}${PROXY_SUFFIX}`;
export const getIdFromProxyId = (proxyId: string) =>
  proxyId.slice(1, -PROXY_SUFFIX.length);

export const EXTERNAL_SUFFIX = "?commonjs-external";
export const getExternalProxyId = (id: string) => `\0${id}${EXTERNAL_SUFFIX}`;
export const getIdFromExternalProxyId = (proxyId: string) =>
  proxyId.slice(1, -EXTERNAL_SUFFIX.length);

export const HELPERS_ID = "\0commonjsHelpers.js";

const { basename, extname, dirname, sep } = path;

// `x['default']` is used instead of `x.default` for backward compatibility with ES3 browsers.
// Minifiers like uglify will usually transpile it back if compatibility with ES3 is not enabled.
export const HELPERS = `
export var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

export function commonjsRequire () {
    throw new Error('Dynamic requires are not currently supported.');
}

export function unwrapExports (x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

export function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}

export function getCjsExportFromNamespace (n) {
    return n && n['default'] || n;
}

export default {
    commonjsRequire,
    unwrapExports,
    createCommonjsModule,
    getCjsExportFromNamespace
}`;

export const extractAssignedNames = (param: any) => {
  const names: any = [];
  extractors[param.type](names, param);
  return names;
};

export const blockDeclarations: { [type: string]: boolean } = {
  const: true,
  let: true
};

export class Scope {
  public parent: any;
  public isBlockScope: boolean;
  public declarations: any;

  constructor(options: any = {}) {
    this.parent = options.parent;
    this.isBlockScope = !!options.block;
    this.declarations = Object.create(null);
    if (options.params) {
      options.params.forEach((param: string) => {
        extractAssignedNames(param).forEach((name: string) => {
          this.declarations[name] = true;
        });
      });
    }
  }
  addDeclaration(node: any, isBlockDeclaration: boolean, isVar: boolean) {
    if (!isBlockDeclaration && this.isBlockScope) {
      // it's a `var` or function node, and this
      // is a block scope, so we need to go up
      this.parent.addDeclaration(node, isBlockDeclaration, isVar);
    } else if (node.id) {
      extractAssignedNames(node.id).forEach((name: string) => {
        this.declarations[name] = true;
      });
    }
  }
  contains(name: string) {
    return (
      this.declarations[name] ||
      (this.parent ? this.parent.contains(name) : false)
    );
  }
}

export const attachScopes = (ast: any, propertyName: string = "scope") => {
  let scope = new Scope();
  walk(ast, {
    enter(n, parent) {
      const node: any = n;
      // function foo () {...}
      // class Foo {...}
      if (/(Function|Class)Declaration/.test(node.type)) {
        scope.addDeclaration(node, false, false);
      }
      // var foo = 1
      if (node.type === "VariableDeclaration") {
        const { kind }: any = node;
        const isBlockDeclaration = blockDeclarations[kind];
        // don't add const/let declarations in the body of a for loop #113
        const parentType = parent ? parent.type : "";
        if (!(isBlockDeclaration && /ForOfStatement/.test(parentType))) {
          node.declarations.forEach((declaration: any) => {
            scope.addDeclaration(declaration, isBlockDeclaration, true);
          });
        }
      }
      let newScope;
      // create new function scope
      if (/Function/.test(node.type)) {
        const func = node;
        newScope = new Scope({
          parent: scope,
          block: false,
          params: func.params
        });
        // named function expressions - the name is considered
        // part of the function's scope
        if (func.type === "FunctionExpression" && func.id) {
          newScope.addDeclaration(func, false, false);
        }
      }
      // create new block scope
      if (node.type === "BlockStatement" && !/Function/.test(parent.type)) {
        newScope = new Scope({
          parent: scope,
          block: true
        });
      }
      // catch clause has its own block scope
      if (node.type === "CatchClause") {
        newScope = new Scope({
          parent: scope,
          params: node.param ? [node.param] : [],
          block: true
        });
      }
      if (newScope) {
        Object.defineProperty(node, propertyName, {
          value: newScope,
          configurable: true
        });
        scope = newScope;
      }
    },
    leave(n) {
      const node: any = n;
      if (node[propertyName]) scope = scope.parent;
    }
  });
  return scope;
};

const reservedWords =
  "break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public";
const builtins =
  "arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl";
const forbiddenIdentifiers = new Set(`${reservedWords} ${builtins}`.split(" "));
forbiddenIdentifiers.add("");
export const makeLegalIdentifier = (str: string) => {
  let identifier = str
    .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/[^$_a-zA-Z0-9]/g, "_");
  if (/\d/.test(identifier[0]) || forbiddenIdentifiers.has(identifier)) {
    identifier = `_${identifier}`;
  }
  return identifier || "_";
};

export const getName = (id: string) => {
  const name = makeLegalIdentifier(basename(`${id}${extname(id)}`)!);
  if (name !== "index") {
    return name;
  }
  const segments = dirname(id).split(sep);
  return makeLegalIdentifier(segments[segments.length - 1]);
};
