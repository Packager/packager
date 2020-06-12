import { InputOptions, OutputOptions, RollupCache, RollupBuild } from "rollup";
import rollup from "rollup/dist/rollup.browser";
import {
  File,
  BundleOptions,
  PackagerOptions,
  PackagerContext,
  PluginManager,
  Plugin,
} from "./types";
import { findEntryFile, deepMerge, packagerContext } from "./utils";
import { createPluginManager, createPluginFactory } from "./plugins";

export default class Packager {
  public inputOptions: InputOptions = {
    inlineDynamicImports: true,
  };
  public outputOptions: OutputOptions = {
    format: "iife",
    freeze: false,
  };

  public packagerOptions: PackagerOptions = {
    cache: true,
    sourcemaps: false,
  };
  public bundleOptions: BundleOptions;

  private packagerContext: PackagerContext;
  private pluginManager: PluginManager;
  private rollupCache: RollupCache;

  constructor(packagerOptions: PackagerOptions) {
    // @todo cleanup old instance

    this.packagerOptions = deepMerge(this.packagerOptions, packagerOptions);
    this.pluginManager = createPluginManager();
    this.packagerContext = packagerContext;
  }

  registerPlugins(plugins: Array<Plugin> | Plugin) {
    this.pluginManager.registerPlugins(plugins);
  }

  async bundle(files: Array<File>, bundleOptions?: BundleOptions) {
    this.packagerContext.set("files", files);

    try {
      const entry = findEntryFile(files);

      this.inputOptions = Object.assign(this.inputOptions, {
        input: entry.path,
        cache: this.packagerOptions.cache && this.rollupCache,
        plugins: createPluginFactory(),
      } as InputOptions);
      this.outputOptions = deepMerge(this.outputOptions, {
        sourcemap: this.packagerOptions.sourcemaps ? "inline" : false,
      } as OutputOptions);
      this.bundleOptions = deepMerge(this.bundleOptions, bundleOptions);
      this.packagerContext.set(
        "state",
        Object.assign(this.packagerContext.get("state"), {
          bundleOptions: this.bundleOptions,
        })
      );

      const bundle = (await rollup.rollup(this.inputOptions)) as RollupBuild;

      this.rollupCache = this.packagerOptions.cache && bundle.cache;

      const bundleOutput = await bundle.generate(this.outputOptions);

      if (!bundleOutput || !bundleOutput.output) {
        throw new Error("Unexpected error when bundling.");
      }

      return {
        code: `${bundleOutput.output[0].code} ${
          this.packagerOptions.sourcemaps && bundleOutput.output[0].map
            ? ` \n //# sourceMappingURL=${bundleOutput.output[0].map.toUrl()}`
            : ""
        }`,
      };
    } catch (e) {
      console.error("BUNDLE ERROR:", e);
    }
  }
}
