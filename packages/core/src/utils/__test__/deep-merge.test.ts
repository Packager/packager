import deepMerge from "../deep-merge";

describe("deep-merge", () => {
  it("should merge two separate basic objects without any overrides", () => {
    const objA = { test: 123 };
    const objB = { another: 456 };

    expect(deepMerge(objA, objB)).toEqual({
      test: 123,
      another: 456,
    });
  });

  it("should merge two separate basic arrays without overrides", () => {
    const arrA = ["123"];
    const arrB = ["456"];

    expect(deepMerge(arrA, arrB)).toEqual(["123", "456"]);
  });

  it("should merge two deep objects without any overrides", () => {
    const objA = { test: { testing: 123 } };
    const objB = { another: { test: 456 } };

    expect(deepMerge(objA, objB)).toEqual({
      test: { testing: 123 },
      another: { test: 456 },
    });
  });

  it("should override a basic value of an object if two similar objects are supplied", () => {
    const objA = { test: 123, another: 123 };
    const objB = { another: 456 };

    expect(deepMerge(objA, objB)).toEqual({
      test: 123,
      another: 456,
    });
  });

  it("should override a deep value of an object if two similar objects are supplied", () => {
    const objA = { test: { another: 123, test: 456 } };
    const objB = { test: { another: 456 } };

    expect(deepMerge(objA, objB)).toEqual({
      test: {
        another: 456,
        test: 456,
      },
    });
  });
});
