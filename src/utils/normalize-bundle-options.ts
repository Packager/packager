import { BundleOptions } from "../types/packager";

export default function(bundleOptions: BundleOptions): BundleOptions {
    return {
        externalModules: normalizeExternalModules(bundleOptions.externalModules)
    };
}

const normalizeExternalModules = (externalModules?: {
    [key: string]: string;
}) =>
    externalModules
        ? Object.keys(externalModules || {}).reduce(
              (acc, curr) => ({
                  ...acc,
                  [curr.toLowerCase()]: externalModules[curr]
              }),
              {}
          )
        : {};
