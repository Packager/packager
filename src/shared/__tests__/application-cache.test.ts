import applicationCache from "../application-cache";

describe("application cache", () => {
    const cache = applicationCache();

    const cachedData = {
        path: "path",
        module: "module",
        code: ""
    };

    beforeEach(() => {
        cache.clear();
    });

    it("should successfully add to cache", () => {
        expect(cache.set("test1", cachedData)).toBeTruthy();
    });
    it("should fail when adding to cache with empty key", () => {
        expect(cache.set("", cachedData)).toBeFalsy();
    });
    it("should successfully delete a cache", () => {
        expect(cache.set("test1", cachedData)).toBeTruthy();
        expect(cache.delete("test1")).toBeTruthy();
    });
    it("should fail if a non-existing cache is being deleted", () => {
        expect(cache.delete("")).toBeFalsy();
    });
    it("should successfully get all caches", () => {
        cache.set("test1", cachedData);
        cache.set("test2", cachedData);

        expect(cache.getAll()).toEqual({
            test1: cachedData,
            test2: cachedData
        });
    });
    it("should successfully clear all caches", () => {
        cache.set("test1", cachedData);
        cache.set("test2", cachedData);

        expect(cache.getAll()).toEqual({
            test1: cachedData,
            test2: cachedData
        });

        cache.clear();

        expect(cache.getAll()).toEqual({});
    });
    it("should successfully update cache", () => {
        cache.set("test1", cachedData);
        cache.update("test1", { test: 123 });

        expect(cache.get("test1")).toEqual({
            ...cachedData,
            test: 123
        });
    });
});
