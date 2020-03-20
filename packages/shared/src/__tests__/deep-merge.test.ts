import { deepMerge } from "../";

describe("deep merge", () => {
  const simpleObj1 = { name: "john" };
  const simpleObj2 = { age: 25 };
  const simpleArr1 = [1];
  const simpleArr2 = [2];

  it("should return a single object if only 1 argument is provided", () => {
    expect(deepMerge(simpleObj1)).toEqual(simpleObj1);
  });

  it("should return a single array if only 1 argument is provided", () => {
    expect(deepMerge(simpleArr1)).toEqual(simpleArr1);
  });

  it("should merge two objects", () => {
    expect(deepMerge(simpleObj1, simpleObj2)).toEqual({
      ...simpleObj1,
      ...simpleObj2
    });
  });

  it("should merge two arrays", () => {
    expect(deepMerge(simpleArr1, simpleArr2)).toEqual([
      ...simpleArr1,
      ...simpleArr2
    ]);
  });

  it("should deeply merge two objects", () => {
    const deepObj1 = {
      details: {
        name: "john",
        age: 24
      }
    };
    const deepObj2 = {
      details: {
        age: 25
      }
    };

    expect(deepMerge(deepObj1, deepObj2)).toEqual({
      details: {
        name: "john",
        age: 25
      }
    });
  });

  it("should deeply merge two arrays", () => {
    const deepArr1 = [[1]];
    const deepArr2 = [[2]];

    expect(deepMerge(deepArr1, deepArr2)).toEqual([[1], [2]]);
  });

  it("should  merge arrays of objects", () => {
    const arrayObj1 = [
      {
        name: "john",
        age: 24
      }
    ];
    const arrayObj2 = [
      {
        name: "bob",
        age: 25
      }
    ];

    expect(deepMerge(arrayObj1, arrayObj2)).toEqual([
      arrayObj1[0],
      arrayObj2[0]
    ]);
  });
});
