import { PackagerContext } from "@typedefs/packager";

export const TRANSPILE_STATUS = {
    PREPARE_FILES: "transpiler:file:prepare",
    PREPARE_ADDITIONAL: "transpiler:additional:prepare",
    ADDITIONAL_TRANSPILED: "transpiler:additional:transpiled",
    TRANSPILE_COMPLETE: "transpiler:transpile:complete",
    ERROR_PREPARING_AND_COMPILING: "transpiler:error:compile",
    ERROR_ADDITIONAL: "transpiler:error:additional"
};

export default class Transpiler {
    public name: string;
    public worker: Worker | null;
    public context: PackagerContext;

    constructor(name: string, worker: Worker | null, context: PackagerContext) {
        this.name = name;
        this.worker = worker;
        this.context = context;
    }

    doTranspile(file: any) {
        return new Promise((resolve, reject) => {
            if (!this.worker) {
                return resolve(file);
            }

            this.worker.onmessage = async ({ data }) => {
                const { file, type, error, additional } = data;

                if (
                    type === TRANSPILE_STATUS.ERROR_ADDITIONAL ||
                    type === TRANSPILE_STATUS.ERROR_PREPARING_AND_COMPILING
                ) {
                    return reject(error);
                }

                if (type === TRANSPILE_STATUS.PREPARE_ADDITIONAL) {
                    try {
                        const additionalTranspiled = await this.transpileAdditional(
                            additional
                        );

                        this.worker!.postMessage({
                            type: TRANSPILE_STATUS.ADDITIONAL_TRANSPILED,
                            file,
                            additional: additionalTranspiled,
                            context: {
                                files: this.context.files
                            }
                        });
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
    }

    async transpileAdditional({
        styles,
        html
    }: {
        styles: any[];
        html: any[];
    }) {
        const stylePromises = [];

        for (const style of styles) {
            const { code, scopeId, path, lang } = style;
            const transpiler = this.fetchTranspiler(style.lang);

            stylePromises.push(
                transpiler.transpile({ code, scopeId, lang, path })
            );
        }

        return {
            styles: await Promise.all(stylePromises)
        };
    }

    fetchTranspiler(lang: string) {
        // @ts-ignore
        let transpiler = this.additionalTranspilers[lang];

        if (transpiler) {
            const activeTranspiler = this.context.cache.transpilers.get(
                `${lang}-transpiler`
            );
            if (activeTranspiler) return activeTranspiler;

            transpiler = new transpiler(this.context);
            this.context.cache.transpilers.set(
                `${lang}-transpiler`,
                transpiler
            );

            return transpiler;
        }

        throw Error(
            `Additional transpiler (${lang}-transpiler) does not exist or isn't supported for ${this.name}`
        );
    }
}
