import isModuleExternal from "../is-module-external";

describe("is module external", () => {
    it("should return true when module is external", () => {
        expect(isModuleExternal("vue")).toBeTruthy();
    });
    it("should return false when module is internal", () => {
        expect(isModuleExternal("./src/index.js")).toBeFalsy();
    });
});
