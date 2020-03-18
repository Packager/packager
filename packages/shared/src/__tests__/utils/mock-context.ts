import { PackagerContext } from "packager";
import { cacheFactory } from "../../";

export const files = [
  {
    name: "app.js",
    path: "/src/app.js",
    entry: true,
    code: `import greeting from './greeting';`
  },
  {
    name: "greeting.js",
    path: "/src/greeting.js",
    code: `export default function () {
    return 'hello world';
}`
  }
];

export const cache = {
  dependencies: cacheFactory(),
  transpilers: cacheFactory(),
  esModulesWithDefaultExport: new Set(),
  esModulesWithoutDefaultExport: new Set()
};

export const workerQueue = {
  currentTask: null,
  complete: [],
  errors: [],
  queue: [],
  awaiters: [],
  push: jest.fn((cb: any) => Promise.resolve()),
  next: jest.fn,
  callAWaiters: jest.fn,
  wait: jest.fn(Promise.resolve)
};

export const bundleOptions = {
  dependencies: {}
};

export const plugins = [];

export const mockContext: PackagerContext = {
  ...cache,
  files,
  workerQueue,
  bundleOptions,
  plugins
};

export default mockContext;
