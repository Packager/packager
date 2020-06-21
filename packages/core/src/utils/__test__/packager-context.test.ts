import { getContext, setContext } from "../packager-context";
import { PackagerContextState } from "../../types";

describe("packager-context", () => {
  beforeEach(() => {
    window.__PACKAGER_CONTEXT__ = {
      plugins: new Map(),
    } as PackagerContextState;
  });

  it("should set the value to context", () => {
    const val = setContext("__KEY__", "__VALUE__");

    expect(val).toEqual({
      __KEY__: "__VALUE__",
    });

    expect(getContext("__"));
  });
});
