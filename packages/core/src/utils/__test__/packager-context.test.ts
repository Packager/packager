import { getContext, setContext } from "../packager-context";

describe("packager-context", () => {
  beforeEach(() => {
    window.__PACKAGER_CONTEXT__ = {
      plugins: [],
    };
  });

  it("should set the value to context", () => {
    const val = setContext("__KEY__", "__VALUE__");

    expect(val).toEqual({
      __KEY__: "__VALUE__",
    });

    expect(getContext("__"));
  });
});
