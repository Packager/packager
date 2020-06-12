import { PackagerContext } from "../types";
import WorkerQueue from "./worker-queue";

window.__PACKAGER_CONTEXT__ = window.__PACKAGER_CONTEXT__ || {
  _rollupPlugins: new Map(),
  _workerQueue: new WorkerQueue(),

  plugins: new Map(),
  files: [],
  npmDependencies: {},
  transpilers: {},

  state: {},
};

export const getContext = (key: string): any =>
  window.__PACKAGER_CONTEXT__[key];

export const setContext = (key: string, value: any): Record<string, any> => {
  window.__PACKAGER_CONTEXT__[key] = value;

  return { [key]: value };
};

export default {
  get: getContext,
  set: setContext,
} as PackagerContext;
