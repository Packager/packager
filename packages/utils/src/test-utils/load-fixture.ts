import fs from "fs";
import path from "path";

interface SetupOptions {
  fixturesRoot: string;
}

export default function (options: SetupOptions) {
  return async function (fixturePath: string) {
    try {
      const file = fs.readFileSync(
        path.resolve(options.fixturesRoot, fixturePath),
        { encoding: "utf8" }
      );

      return file;
    } catch (e) {
      console.error("FIXTURE LOAD ERROR: ", e);
      return null;
    }
  };
}
