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
});
