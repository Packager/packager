import { resolveRelativeExternal } from "../";
import mockContext from "./utils/mock-context";

let childPath;
let parentPath;

describe("external relative resolver", () => {
  beforeEach(() => {
    childPath = "./cjs/react.development.js";
    parentPath = "react";
  });

  it("should resolve file path correctly", () => {
    const resolves = resolveRelativeExternal(
      childPath,
      parentPath,
      mockContext
    );

    expect(resolves).toBe("/react/cjs/react.development.js");
  });

  it("should throw if parent begins with @", () => {
    parentPath = `@${parentPath}`;

    expect(() =>
      resolveRelativeExternal(childPath, parentPath, mockContext)
    ).toThrowError();
  });

  it("should fetch the parent from the dependencies context and resolve child", () => {
    parentPath = "svelte/internal";
    childPath = "../testing.js";
    mockContext.dependencies.set(parentPath, {
      meta: {
        url: "https://unpkg.com/svelte/internal.js"
      }
    });

    expect(resolveRelativeExternal(childPath, parentPath, mockContext)).toBe(
      `/testing.js`
    );
  });

  it("should resolve child if parent beings with '/' but isn't in the dependencies", () => {
    parentPath = "react/testing";
    childPath = "../testing.js";

    expect(resolveRelativeExternal(childPath, parentPath, mockContext)).toBe(
      `/testing.js`
    );
  });
});
