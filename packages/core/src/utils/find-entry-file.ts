import { File } from "../types";

/**
 * There are certain rules for finding an entry file in Packager.
 *
 * 1. If a file with 'entry' field set to true exists, use it. If not, carry on.
 * 2. If package.json exists, use the "main" field. If file or field doesn't exist, carry on.
 * 3. If dist/index.js OR build/index.js OR src/index.js exists, use it. If not, carry on.
 * 4. If dist/index.ts OR build/index.ts OR src/index.ts exists, use it. If not, carry on.
 * 5. If dist/index.jsx OR build/index.jsx OR src/index.jsx exists, use it. If not, carry on.
 * 6. If dist/index.tsx OR build/index.tsx OR src/index.tsx exists, use it. If not, carry on.
 * 7. If all above fail, throw an error.
 */
const findEntryFile = (files: Array<File>): File => {
  const forcedEntryFile = files.find((file) => file.entry);

  if (forcedEntryFile) {
    return forcedEntryFile;
  }

  const allowedFolders = ["dist", "build", "src"];
  const allowedFiles = ["index.js", "index.ts", "index.jsx", "index.tsx"];
  const packageJsonFile = files.find((file) => file.path === "/package.json");

  if (packageJsonFile) {
    const parsedPackageJsonFile = JSON.parse(packageJsonFile.code);
    const mainFile =
      parsedPackageJsonFile.main &&
      files.find(
        (file) =>
          (parsedPackageJsonFile.main.startsWith("/") &&
            file.path === parsedPackageJsonFile.main) ||
          (!parsedPackageJsonFile.main.startsWith("/") &&
            file.path === `/${parsedPackageJsonFile.main}`)
      );

    if (mainFile) {
      return mainFile;
    }
  }

  for (const file of allowedFiles) {
    for (const folder of allowedFolders) {
      const fileWithFolder = `/${folder}/${file}`;
      const foundFile = files.find((f) => f.path === fileWithFolder);

      if (foundFile) {
        return foundFile;
      }
    }
  }

  throw new Error(
    "Entry file could not be found. Set it using 'main' in package.json."
  );
};

export default findEntryFile;
