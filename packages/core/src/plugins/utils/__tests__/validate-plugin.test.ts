import validatePlugin, {
  MISSING_NAME_FIELD,
  MISSING_FIELD
} from "../validate-plugin";

describe("validate plugin", () => {
  it("should throw if a name is missing", () => {
    const error = new Error(MISSING_NAME_FIELD);

    expect(() => validatePlugin({})).toThrow(error);
  });
});
