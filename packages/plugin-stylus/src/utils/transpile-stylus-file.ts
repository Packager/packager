import { WebWorkerContext } from "packager";

const transpileFile = async (context: WebWorkerContext, stylus: any) =>
  new Promise((resolve, reject) => {
    stylus(context.code)
      .set("filename", context.moduleId)
      .render((err: any, css: string) => {
        if (err) {
          reject(err);
        } else {
          resolve({ ...context, code: css });
        }
      });
  });

export default transpileFile;
