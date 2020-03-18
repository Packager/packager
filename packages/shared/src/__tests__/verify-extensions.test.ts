import { verifyExtensions } from "../";

describe("verify extensions", () => {
  it("should return true when a vue file path is tested against a vue extension", () => {
    const path = "/src/App.vue";
    const verify = verifyExtensions([".vue"]);

    expect(verify(path)).toBeTruthy();
  });

  it("should return false when a jsx file path is tested against a vue extension", () => {
    const path = "/src/App.jsx";
    const verify = verifyExtensions([".vue"]);

    expect(verify(path)).toBeFalsy();
  });

  it("should return false when a file path without an extesion is tested against a vue extension", () => {
    const path = "/src/App";
    const verify = verifyExtensions([".vue"]);

    expect(verify(path)).toBeFalsy();
  });

  it("should return false when a file path has extention characters without the dot", () => {
    const path = "/src/Appvue";
    const verify = verifyExtensions([".vue"]);

    expect(verify(path)).toBeFalsy();
  });

  it("should return true when a ts file path is tested against ts extensions", () => {
    const path = "/src/App.ts";
    const verify = verifyExtensions([".ts", ".tsx"]);

    expect(verify(path)).toBeTruthy();
  });
});
