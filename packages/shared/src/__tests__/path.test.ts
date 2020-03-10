import { path } from "../";

describe("path", () => {
    it("should return true when absolute path is given on isAbsolute", () => {
        expect(path.isAbsolute("/src/app.js")).toBeTruthy();
    });

    it("should return false when relative path is given on isAbsolute", () => {
        expect(path.isAbsolute("./app.js")).toBeFalsy();
    });

    it("should return true when relative path is given on isRelative", () => {
        expect(path.isRelative("./app.js")).toBeTruthy();
    });

    it("should return false when absolute path is given on isRelative", () => {
        expect(path.isRelative("/src/app.js")).toBeFalsy();
    });

    it("should return the basename for a path", () => {
        expect(path.basename("/src/app.js")).toBe("app.js");
    });

    it("should return the dirname for a path", () => {
        expect(path.dirname("/src/app.js")).toBe("/src");
    });

    it("should return the extension from a path", () => {
        expect(path.extname("/src/app.js")).toBe(".js");
    });

    it("should resolve child path from the parent dir", () => {
        expect(path.resolve("/src", "./test.js")).toBe("/src/test.js");
    });

    it("should normalize the path by replacing double forward slashes", () => {
        expect(path.normalize("//test.js")).toBe("/test.js");
    });

    it("should return the correct separator", () => {
        expect(path.sep).toBe("/");
    });
});
