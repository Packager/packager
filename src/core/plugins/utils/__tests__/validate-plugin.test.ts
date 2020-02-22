import validatePlugin, {
    MISSING_NAME_FIELD,
    MISSING_FIELD
} from "../validate-plugin";

describe("validate plugin", () => {
    it("should throw if a name is missing", () => {
        const error = new Error(MISSING_NAME_FIELD);

        expect(() => validatePlugin({})).toThrow(error);
    });

    it("should throw if any other required field is empty", () => {
        const plugin = {
            name: "some-plugin"
        };

        const error = new Error(MISSING_FIELD(plugin.name, "extensions"));

        expect(() => validatePlugin(plugin)).toThrow(error);
    });
});
