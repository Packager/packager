import { createPlugin } from "packager";

import beforeBundle from "./beforeBundle";

const jsonPlugin = createPlugin({
  name: "json",
  beforeBundle
});

export default jsonPlugin;
