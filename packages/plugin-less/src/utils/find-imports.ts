import { path, resolveWorkerDependency } from "packager-pluginutils";
import { Less } from "../types";

/**
 * We use Less' parser to scan for imports within the code.
 * This allows us to later request those imports as dependencies
 * and load them accordingly.
 *
 * We need to do this because Less' fileManager.loadFile fires
 * at the same time for multiple imports which causes a race condition
 * in the current implementation of worker transpiler.
 *
 * --------
 *
 * There is a problem where the parser doesn't add to "files" css imports with ".css"
 * in the filename. This is why we have to use postcss and the plugin from packager-plugin-css.
 */
const findImports = (
  moduleId: string,
  code: string,
  less: Less
): Promise<Array<string> | null> =>
  new Promise((resolve, reject) => {
    const options = {
      relativeUrls: true,
      filename: moduleId,
      plugins: [fakeFileManager(less)],
    };

    less.parse(code, options, (err: any, _: any, imports: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(imports.files.length ? imports.files : null);
      }
    });
  });

/**
 * This is only used to let us know about the imports in a file.
 */
const fakeFileManager = (less: Less) => {
  const fileManager = new less.FileManager();

  fileManager.loadFile = async (filename: string) => ({
    contents: "",
    filename,
  });

  return {
    install(_, pluginManager: any) {
      pluginManager.addFileManager(fileManager);
    },
  };
};

const retryExtensions = [".less", ".css"];
export default async (moduleId: string, code: string, less: Less) => {
  const loadedDependencies = [];
  const loadDependenciesRecursively = async (
    moduleIds: Array<string>,
    parentId: string
  ): Promise<void> => {
    for (const moduleId of moduleIds) {
      const moduleIdExtension = path.extname(moduleId);
      const moduleIdNoExtension = moduleIdExtension
        ? moduleId.slice(0, moduleId.lastIndexOf(moduleIdExtension))
        : moduleId;

      const possiblePaths = retryExtensions.map((ext) => {
        if (ext === moduleIdExtension) {
          return path.resolve(path.dirname(parentId), moduleId);
        }

        if (moduleId === moduleIdExtension) {
          return path.resolve(path.dirname(parentId), `${moduleId}${ext}`);
        }

        return path.resolve(
          path.dirname(parentId),
          `${moduleIdNoExtension}${ext}`
        );
      });

      for (const possiblePath of possiblePaths) {
        const resolvedDependency = await resolveWorkerDependency(possiblePath);

        if (resolvedDependency) {
          loadedDependencies.push({
            ...resolvedDependency,
            _moduleId: moduleId,
            _parentDir: path.dirname(parentId),
            _actualParent: parentId,
          });

          const imports = await findImports(
            resolvedDependency.moduleId,
            resolvedDependency.code,
            less
          );

          if (imports) {
            await loadDependenciesRecursively(
              imports,
              resolvedDependency.moduleId
            );
          }
        }
      }
    }
  };

  try {
    const imports = await findImports(moduleId, code, less);

    if (imports) {
      await loadDependenciesRecursively(imports, moduleId);
    }
  } catch (e) {
    /* noop */
  }

  return loadedDependencies;
};
