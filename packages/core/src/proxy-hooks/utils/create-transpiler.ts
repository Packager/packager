import { TRANSPILE_STATUS } from "packager-pluginutils";
import { Plugin, WebWorkerEvent, File } from "../../types";
import { packagerContext } from "../../utils";

export type TranspileContext = {
  moduleId: string;
  code: string;
  isExternal?: boolean;
};

const createTranspiler = (plugin: Plugin) => {
  if (!plugin.transpiler.worker) {
    throw new Error("A worker is required to run a transpilation.");
  }

  return {
    worker: plugin.transpiler.worker(),
    async transpile(context: TranspileContext) {
      return await packagerContext.get("_workerQueue").add(
        () =>
          new Promise((resolve, reject) => {
            this.worker.onmessage = async ({ data }: WebWorkerEvent) => {
              const { context, type, error } = data;

              if (type === TRANSPILE_STATUS.ERROR) {
                return reject(error);
              }

              if (type === TRANSPILE_STATUS.ADD_DEPENDENCY) {
                if (context.isExternal) {
                  throw new Error(
                    "External dependencies via the transpiler are not yet supported."
                  );
                }

                const file = packagerContext
                  .get("files")
                  .find((file: File) => file.path === context.moduleId);

                if (!file) {
                  throw new Error(
                    `Failed to load ${context.moduleId} using ${plugin.name}`
                  );
                }

                return this.worker.postMessage({
                  type: TRANSPILE_STATUS.ADD_DEPENDENCY,
                  context: {
                    moduleId: file.path,
                    code: file.code,
                    isExternal: false,
                  },
                });
              }

              /**
               * need to figure out a nice way to transpile dependencies
               * that are not from the same transpiler. As an example,
               * if a Vue file (which uses vue-transpiler) has some SASS code
               * in it, we need to invoke the SASS transpiler.
               */
              if (type === TRANSPILE_STATUS.TRANSPILE_DEPENDENCY) {
                throw new Error(
                  "Transpiling dependencies via the transpiler is not yet supported."
                );
              }

              if (type === TRANSPILE_STATUS.END) {
                return resolve(context);
              }
            };

            this.worker.postMessage({
              type: TRANSPILE_STATUS.START,
              context,
            });
          })
      );
    },
  };
};

export default createTranspiler;
