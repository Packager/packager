import { Plugin, InputOptions, RollupError, WarningHandler } from "rollup";
import { packagerContext } from "../../utils";

export default {
  name: "packager-internal-plugin",
  options(options) {
    return Object.assign(options, {
      onwarn(warning: RollupError, warn: WarningHandler) {
        /**
         * noop - let's not scare the users with rollup warnings ;p
         */
      },
    } as InputOptions);
  },
  buildStart() {
    if (!packagerContext.get("_parser")) {
      packagerContext.set("_parser", this.parse);
    }
  },
} as Plugin;
