import { WebWorkerContext } from "packager";

export interface Less {
  AbstractFileManager: any;
  FileManager: {
    new (): {
      loadFile: (moduleId: string, currentDir: string) => Promise<any>;
    };
  };
  parse: (code: string, options: any, callback: Function) => any;
  render: (code: string, options: any, callback: Function) => void;
}

export interface WebWorker extends Worker {
  window: {
    document: {
      currentScript: { async: true };
      createElement: () => { appendChild: () => {} };
      createTextNode: () => {};
      getElementsByTagName: () => [];
      head: { appendChild: () => {}; removeChild: () => {} };
    };
  };
  postcss: any;
  less: Less;
  importScripts: (...urls: Array<string>) => void;
}

export declare function transpileLessFile(
  context: WebWorkerContext,
  less: Less,
  postcss: any
): Promise<WebWorkerContext>;
