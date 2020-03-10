import { resolveRelative } from "../";
import mockContext from "./utils/mock-context";

let childPath;
let parentPath;

describe("relative resolver", () => {
    beforeEach(() => {
        childPath = "./greeting.js";
        parentPath = "/src/app.js";
    });

    it("should resolve file path correctly", () => {
        const resolves = resolveRelative(childPath, parentPath, mockContext);

        expect(resolves).toBe("/src/greeting.js");
    });

    it("should resolve full file correctly", () => {
        const resolves = resolveRelative(
            childPath,
            parentPath,
            mockContext,
            false
        );

        expect(resolves).toEqual({
            name: "greeting.js",
            path: "/src/greeting.js",
            code: `export default function () {
    return 'hello world';
}`
        });
    });

    it("should return null if child path is not found in the files context", () => {
        childPath = "./greeting.jss";

        const resolves = resolveRelative(childPath, parentPath, mockContext);

        expect(resolves).toBeNull();
    });

    it("should return null if parent path is not specified", () => {
        parentPath = "";

        const resolves = resolveRelative(childPath, parentPath, mockContext);

        expect(resolves).toBeNull();
    });

    it("should retry file successfully if supported extension is missing", () => {
        childPath = "./greeting";

        const resolves = resolveRelative(childPath, parentPath, mockContext);

        expect(resolves).toBe("/src/greeting.js");
    });
});
