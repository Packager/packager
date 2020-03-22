import { normalizeBundleOptions } from "../";

describe("normalize bundle options", () => {
  it("should convert keys from dependencies to lowercase", () => {
    const depsPreNormalize = {
      VuE: "2.6.11",
      React: "16.12",
      svelte: "3"
    };

    const depsPostNormalize = {
      vue: "2.6.11",
      react: "16.12",
      svelte: "3"
    };

    expect(normalizeBundleOptions({ dependencies: depsPreNormalize })).toEqual({
      dependencies: depsPostNormalize
    });
  });

  it("should do nothing if there are no dependencies to normalize", () => {
    expect(normalizeBundleOptions({ dependencies: {} })).toEqual({
      dependencies: {}
    });
  });
});
