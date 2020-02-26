import { createPlugin } from "packager";

import resolver from "./resolver";
import loader from "./loader";
import beforeBundle from "./beforeBundle";

const commonjsPlugin = createPlugin({
    name: "commonjs-plugin",
    extensions: [".js"],
    allowExternal: true,
    resolver,
    loader,
    beforeBundle
});

export default commonjsPlugin;
