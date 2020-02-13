import {
    generateExport,
    generateExportsForAllStyles
} from "../style-plugin-helpers";
import { test1, test2 } from "./utils/style-plugin-helpers";

describe("style plugin helpers", () => {
    it("should generate a string with a function and a default export", () => {
        const file = {
            code: "* { color: red; }",
            path: "red.css"
        };

        expect(generateExport(file)).toMatch(test1);
    });

    it("should generate a string with a function but without a default export", () => {
        const file = {
            code: "* { color: red; }",
            path: "red.css"
        };

        expect(generateExport(file, false)).toMatch(test2);
    });
});
