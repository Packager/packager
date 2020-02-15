import { BundleOptions } from "packager/types/packager";

export default (bundleOptions: BundleOptions): BundleOptions => {
    return {
        dependencies: convertKeysToLowercase(bundleOptions.dependencies)
    };
};

export const convertKeysToLowercase = (dependencies?: {
    [key: string]: string;
}) =>
    dependencies
        ? Object.keys(dependencies || {}).reduce(
              (acc, curr) => ({
                  ...acc,
                  [curr.toLowerCase()]: dependencies[curr]
              }),
              {}
          )
        : {};
