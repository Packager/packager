import cache from "../dependency-cache";

describe("dependency cache", () => {
    const dependency = {
        path: "path",
        module: "module",
        code: ""
    };

    beforeEach(() => {
        cache.clear();
    });

    it("should successfully add dependency to cache", () => {
        expect(cache.set("test1", dependency)).toBeTruthy();
    });
    it("should fail when adding to cache with empty key", () => {
        expect(cache.set("", dependency)).toBeFalsy();
    });
    it("should successfully delete a cache", () => {
        expect(cache.set("test1", dependency)).toBeTruthy();
        expect(cache.delete("test1")).toBeTruthy();
    });
    it("should fail if a non-existing cache is being deleted", () => {
        expect(cache.delete("")).toBeFalsy();
    });
    it("should successfully get all caches", () => {
        cache.set("test1", dependency);
        cache.set("test2", dependency);

        expect(cache.getAll()).toEqual({
            test1: dependency,
            test2: dependency
        });
    });
    it("should successfully clear all caches", () => {
        cache.set("test1", dependency);
        cache.set("test2", dependency);

        expect(cache.getAll()).toEqual({
            test1: dependency,
            test2: dependency
        });

        cache.clear();

        expect(cache.getAll()).toEqual({});
    });
});
