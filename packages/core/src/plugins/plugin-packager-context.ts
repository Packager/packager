import { packagerContext } from "../utils";

export default {
  files: packagerContext.get("files"),
  parser: (code: string, options?: any) =>
    packagerContext.get("_parser")(code, options),
};
