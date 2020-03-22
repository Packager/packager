import { createPlugin } from "packager";

import resolver from "./resolver";
import loader from "./loader";
import beforeBundle from "./beforeBundle";

const commonjsPlugin = createPlugin({
  name: "commonjs",
  resolver,
  loader,
  beforeBundle
});

export default commonjsPlugin;
