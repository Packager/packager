import Transpiler from "../transpiler";
// @ts-ignore
import WebWorker from "web-worker:./worker.ts";
import { PackagerContext } from "../../plugins";

export default class VueTranspiler extends Transpiler {
    constructor(context: PackagerContext) {
        super("vue-transpiler", new WebWorker(), context);
    }

    transpile(code: string) {
        return new Promise(resolve =>
            setTimeout(() =>
                resolve(
                    `export default function test () { return \`${code}\`; }`
                )
            )
        );
    }
}
