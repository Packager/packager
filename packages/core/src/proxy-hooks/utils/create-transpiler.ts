import { TRANSPILE_STATUS } from "packager-pluginutils";
import { Plugin, File } from "../../types";
import { packagerContext } from "../../utils";

const createTranspiler = (plugin: Plugin) => {
  if (!plugin.transpiler!.worker) {
    throw new Error("Every transpiler requires a worker.");
  }

  return {
    worker: plugin.transpiler.worker(),
    async transpile(file: File) {
      return await packagerContext.get("_workerQueue").add(
        () =>
          new Promise((resolve, reject) => {
            this.worker.onmessage = async ({ data }) => {
              const { file, type, error } = data;

              if (type === TRANSPILE_STATUS.ERROR) {
                return reject(error);
              }

              // if (type === "TEST_TYPE_SEND") {
              //   console.log("CAUGHT!");
              //   await new Promise((resolve) => setTimeout(resolve, 1000));
              //   this.worker.postMessage({
              //     type: "TEST_TYPE_SEND",
              //     data,
              //   });
              // }

              // if (type === TRANSPILE_STATUS.ADD_DEPENDENCY) {
              //   try {
              //     console.log("ADD DEPENDENCY!");
              //     // const additionalTranspiled = await this.transpileAdditional(
              //     //   additional
              //     // );

              //     // this.worker.postMessage({
              //     //   type: TRANSPILE_STATUS.ADD_DEPENDENCY,
              //     //   file,
              //     //   additional: additionalTranspiled,
              //     //   context: {
              //     //     files: packagerContext.get('files')
              //     //   },
              //     // });
              //   } catch (error) {
              //     return reject(error);
              //   }
              // }

              if (type === TRANSPILE_STATUS.END) {
                return resolve(file);
              }
            };

            this.worker.postMessage({
              type: TRANSPILE_STATUS.START,
              file,
              context: {
                files: packagerContext.get("files"),
              },
            });
          })
      );
    },
  };
};

export default createTranspiler;
