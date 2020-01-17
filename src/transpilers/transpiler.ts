export const TRANSPILE_STATUS = {
    PREPARE_FILES: "transpiler:files:prepare",
    START_ADDITIONAL: "transpiler:additional:start",
    END_ADDITIONAL: "transpiler:additional:end",
    TRANSPILE_COMPLETE: "transpiler:transpile:complete"
};

export default class Transpiler {
    public name: string;
    public worker: Worker;
    public loadedTranspilers: { [name: string]: Transpiler };

    constructor(name: string, worker: Worker) {
        this.name = name;
        this.worker = worker;
        this.loadedTranspilers = {};
    }
}
