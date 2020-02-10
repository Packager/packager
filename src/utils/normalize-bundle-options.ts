import { BundleOptions } from "../types/packager";

export default function(bundleOptions: BundleOptions): BundleOptions {
    return {
        dependencies: normalizeDependencies(bundleOptions.dependencies)
    };
}

const normalizeDependencies = (dependencies?: { [key: string]: string }) =>
    dependencies
        ? Object.keys(dependencies || {}).reduce(
              (acc, curr) => ({
                  ...acc,
                  [curr.toLowerCase()]: dependencies[curr]
              }),
              {}
          )
        : {};
