import {
  SourceMap,
  Plugin as RollupPlugin,
  PluginContext as RollupPluginContext,
} from "rollup";
import { TRANSPILE_STATUS } from "packager-pluginutils";

// Interfaces
export interface File {
  path: string;
  code: string;
  entry?: boolean;
}

export interface Plugin {
  name: string;
  transpiler?: PluginTranspiler;
  extensions?: Array<string>;
  resolver?: PluginResolverHook;
  loader?: PluginLoaderHook;
  beforeBundle?: PluginBeforeBundleHook;
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

export interface WebWorkerEvent extends MessageEvent {
  data: {
    file: File;
    type: TRANSPILE_STATUS;
    context: WebWorkerContext;
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
  code: string,
  moduleId: string
) => Promise<PluginBeforeBundleHookResult> | PluginBeforeBundleHookResult;

export type PluginTranspiler = {
  worker: () => Worker;
};

export type PackagerContextState = {
  _rollupPlugins: Map<string, RollupPlugin>;
  _workerQueue: any;

  plugins: Map<string, Plugin>;
  files: Array<File>;
  npmDependencies: Record<string, any>;
  transpilers: Record<string, any>;

  state: Record<string, any>;
};

export type WebWorkerContext = {
  files: Array<File>;
};

// Others
declare global {
  interface Window {
    __PACKAGER_CONTEXT__: PackagerContextState;
  }
}

export declare const packagerContext: {
  files: Array<File>;
};
