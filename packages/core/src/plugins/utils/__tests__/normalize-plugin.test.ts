import normalizePlugin from "../normalize-plugin";

describe("normalize plugin", () => {
  it("should remove unwanted fields", () => {
    const plugin = {
      name: "vue-plugin",
      transpiler: {},
      resolver: () => ({}),
      loader: () => ({}),
      beforeBundle: () => ({}),
      randomBoolean: true
    };

    /**
     * JSON.stringify is a workaround for this issue:
     * https://github.com/facebook/jest/issues/8475
     */
    expect(JSON.stringify(normalizePlugin(plugin))).toEqual(
      JSON.stringify({
        name: "vue-plugin",
        transpiler: {},
        resolver: () => ({}),
        loader: () => ({}),
        beforeBundle: () => ({})
      })
    );
  });
});
