import {
  SourceMap,
  Plugin as RollupPlugin,
  PluginContext as RollupPluginContext,
} from "rollup";
import {
  TRANSPILE_STATUS,
  TRANSPILE_ERROR,
  RootNode,
} from "packager-pluginutils";

// Interfaces
export interface File {
  path: string;
  code: string;
  entry?: boolean;
}

export interface Plugin {
  name: string;
  transpiler?: PluginTranspiler;
  resolver?: PluginResolverHook;
  loader?: PluginLoaderHook;
}

export interface PluginManager {
  getPlugins: (
    name?: string
  ) => {
    rollup: Array<RollupPlugin> | RollupPlugin;
    raw: Array<Plugin> | Plugin;
  };
  registerPlugins: (plugins: Array<Plugin> | Plugin) => void;
}

export interface PackagerContext {
  get: (key: string) => any;
  set: (key: string, value: any) => Record<string, any>;
}

interface WorkerError extends Error {
  type: string;
}

export interface WebWorkerEvent extends MessageEvent {
  data: {
    type: TRANSPILE_STATUS;
    context: WebWorkerContext;
    error?: TRANSPILE_ERROR;
  };
}

// Types
export type PackagerOptions = {
  cache: boolean;
  sourcemaps: boolean;
};

export type BundleOptions = {
  dependencies: Record<string, string>;
};

export type PluginResolverResult = { id: string } | string | null | void;
export type PluginResolverHook = (
  this: RollupPluginContext,
  moduleId: string,
  parentId?: string
) => Promise<PluginResolverResult> | PluginResolverResult;

export type PluginLoaderResult =
  | {
      code: string;
      map?: string | SourceMap;
      syntheticNamedExports?: boolean | null;
    }
  | string
  | null
  | void;
export type PluginLoaderHook = (
  this: RollupPluginContext,
  moduleId: string
) => Promise<PluginLoaderResult> | PluginLoaderResult;

export type PluginBeforeBundleHookResult = string | null | void;
export type PluginBeforeBundleHook = (
  this: RollupPluginContext,
  moduleId: string,
  code: string
) => Promise<PluginBeforeBundleHookResult> | PluginBeforeBundleHookResult;

/**
 * Either worker or beforeBundle is required.
 */
export type PluginTranspiler = {
  gateway: (moduleId: string, code: string) => boolean;
  worker?: () => Worker;
  beforeBundle?: PluginBeforeBundleHook;
};

export type Parser = (code: string, options?: any) => RootNode;

export type PackagerContextState = {
  _rollupPlugins: Map<string, RollupPlugin>;
  _workerQueue: any;
  _parser: Parser;

  plugins: Map<string, Plugin>;
  files: Array<File>;
  npmDependencies: Record<string, any>;
  transpilers: Record<string, any>;

  state: Record<string, any>;
};

export type WebWorkerContext = {
  moduleId: string;
  code: string;
  isExternal?: boolean;
};

// Others
declare global {
  interface Window {
    __PACKAGER_CONTEXT__: PackagerContextState;
  }
}

export declare const packagerContext: {
  files: Array<File>;
  parser: Parser;
};
