import {
    TranspilerAPI,
    TranspilerFactory,
    File,
    PackagerContext
} from "../../types";

export const TRANSPILE_STATUS = {
    PREPARE_FILES: "TRANSPILER:FILE:PREPARE",
    PREPARE_ADDITIONAL: "TRANSPILER:ADDITIONAL:PREPARE",
    ADDITIONAL_TRANSPILED: "TRANSPILER:ADDITIONAL:TRANSPILED",
    TRANSPILE_COMPLETE: "TRANSPILER:TRANSPILE:COMPLETE",
    ERROR_COMPILE: "TRANSPILER:ERROR:COMPILE",
    ERROR_ADDITIONAL: "TRANSPILER:ERROR:ADDITIONAL"
};

const validateOptions = (options: TranspilerAPI) => {
    if (!options.worker) {
        throw new Error("Every transpiler requires a worker.");
    }

    if (
        !options.extensions ||
        !Array.isArray(options.extensions) ||
        (Array.isArray(options.extensions) && options.extensions.length === 0)
    ) {
        throw new Error("Every transpiler requires extensions.");
    }
};

export const createTranspiler = (options: TranspilerAPI): TranspilerFactory => {
    validateOptions(options);

    return function(context: PackagerContext) {
        return {
            context,
            worker: options.worker(),
            extensions: options.extensions,
            transpile(file: File) {
                return new Promise((resolve, reject) => {
                    this.worker.onmessage = async ({ data }) => {
                        const { file, type, error, additional } = data;

                        if (
                            type === TRANSPILE_STATUS.ERROR_ADDITIONAL ||
                            type === TRANSPILE_STATUS.ERROR_COMPILE
                        ) {
                            return reject(error);
                        }

                        if (type === TRANSPILE_STATUS.PREPARE_ADDITIONAL) {
                            try {
                                throw new Error(
                                    `Can't use additional transpilers yet.`
                                );
                                // const additionalTranspiled = await this.transpileAdditional(
                                //     additional
                                // );

                                // this.worker.postMessage({
                                //     type: TRANSPILE_STATUS.ADDITIONAL_TRANSPILED,
                                //     file,
                                //     additional: additionalTranspiled,
                                //     context: {
                                //         files: this.context.files
                                //     }
                                // });
                            } catch (error) {
                                return reject(error);
                            }
                        }

                        if (type === TRANSPILE_STATUS.TRANSPILE_COMPLETE) {
                            return resolve(file);
                        }
                    };

                    this.worker.postMessage({
                        type: TRANSPILE_STATUS.PREPARE_FILES,
                        file,
                        context: {
                            files: this.context.files
                        }
                    });
                });
            },
            setContext(context: PackagerContext): void {
                this.context = context;
            }
        };
    };
};
