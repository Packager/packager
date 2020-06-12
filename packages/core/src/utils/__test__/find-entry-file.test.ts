import { File } from "../../types";
import findEntryFile from "../find-entry-file";

describe("find-entry-file", () => {
  it("should set the entry file if the entry field of that file is true", () => {
    const files = [
      { path: "/src/index.tsx" },
      { path: "/src/main.js", entry: true },
      { path: "/src/index.ts" },
    ] as Array<File>;

    expect(findEntryFile(files)).toEqual({
      path: "/src/main.js",
      entry: true,
    });
  });

  it("should use the main field from package.json and find the correct file", () => {
    const packageJsonFile = {
      path: "/package.json",
      code: JSON.stringify({
        main: "src/index.ts",
      }),
    };
    const files = [
      { path: "/src/index.tsx" },
      { path: "/src/index.ts" },
      { path: "/src/index.js" },
      packageJsonFile,
    ] as Array<File>;

    expect(findEntryFile(files)).toEqual({
      path: "/src/index.ts",
    });
  });

  it("should get first possible entry if package.json isn't supplied", () => {
    const files = [
      { path: "/src/app.js" },
      { path: "/src/component/Greeting.vue" },
      { path: "/src/index.jsx" },
      { path: "/src/component/Hello.vue" },
    ] as Array<File>;

    expect(findEntryFile(files)).toEqual({
      path: "/src/index.jsx",
    });
  });

  it("should carry on looking for an entry file even if 'main' field file doesn't exist", () => {
    const packageJsonFile = {
      path: "/package.json",
      code: JSON.stringify({
        main: "/dist/main.js",
      }),
    };
    const files = [
      { path: "/src/app.tsx" },
      { path: "/src/index.js" },
      { path: "/src/main.ts" },
      packageJsonFile,
    ] as Array<File>;

    expect(findEntryFile(files)).toEqual({
      path: "/src/index.js",
    });
  });

  it("should throw if no entry file has been found", () => {
    const files = [
      { path: "/src/app.js" },
      { path: "/src/component/Greeting.vue" },
    ] as Array<File>;

    expect(() => findEntryFile(files)).toThrow(
      "Entry file could not be found. Set it using 'main' in package.json."
    );
  });
});
