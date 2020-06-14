import { WebWorkerContext } from "packager";
import { transpileCssFile } from "packager-plugin-css";
import findImports from "./find-imports";
import { Less } from "../types";

type Dependency = {
  moduleId: string;
  code: string;
  _moduleId: string;
  _parentDir: string;
  _actualParent: string;
};

const fileManager = (loadedDependencies: Array<Dependency>, less: Less) => {
  const lessManager = new less.FileManager();

  lessManager.loadFile = async (moduleId: string, parentDir: string) => {
    const foundFile = loadedDependencies.find(
      (dep) =>
        dep._moduleId === moduleId &&
        (`${dep._parentDir}/` === parentDir || dep._parentDir === parentDir)
    );

    if (foundFile) {
      return {
        contents: foundFile.code,
        filename: foundFile.moduleId,
      };
    }

    throw new Error(`Failed to load ${moduleId}.`);
  };

  return {
    install(_, pluginManager: any) {
      pluginManager.addFileManager(lessManager);
    },
  };
};

export default (context: WebWorkerContext, less: Less, postcss: any) =>
  new Promise(async (resolve, reject) => {
    const imports = await findImports(context.moduleId, context.code, less);
    const options = {
      plugins: [fileManager(imports, less)],
      relativeUrls: false,
      filename: context.moduleId,
    };

    less.render(context.code, options, async (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        try {
          const transpiledCss = await transpileCssFile(
            {
              ...context,
              code: data.css,
            },
            postcss
          );

          resolve({ ...context, code: transpiledCss.code });
        } catch (e) {
          resolve(e);
        }
      }
    });
  });
