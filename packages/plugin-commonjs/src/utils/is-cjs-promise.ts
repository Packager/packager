/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */

const isCjsPromises = new Map();

export const getIsCjsPromise = (id: string): Promise<boolean> =>
  new Promise(resolve => resolve(isCjsPromises.get(id) || false));

export const setIsCjsPromise = (id: string, is: boolean) =>
  isCjsPromises.set(id, is);
