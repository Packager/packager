import { ApplicationCache } from "../types";

const isObject = (value: any) => {
    return value && typeof value === "object" && value.constructor === Object;
};

export const cacheFactory = () => {
    const cache = new Map();

    return {
        get(name: string): any | undefined {
            return cache.get(name);
        },
        getAll(): { [name: string]: any } {
            return Array.from(cache.entries()).reduce(
                (acc, val) => ({
                    ...acc,
                    [val[0]]: val[1] || null
                }),
                {}
            );
        },
        set(name: string, value: any): boolean {
            if (name == null || name == "") {
                return false;
            }

            cache.set(name, value);
            return this.has(name);
        },
        has(name: string): boolean {
            return Boolean(this.get(name));
        },
        update(name: string, value: any) {
            const found = this.get(name);
            if (found) {
                if (isObject(value)) {
                    this.set(name, { ...found, ...value });
                    return this.has(name);
                } else {
                    this.set(name, value);
                    return this.has(name);
                }
            }
        },
        delete(name: string): boolean {
            return cache.delete(name);
        },
        clear(): void {
            cache.clear();
        }
    } as ApplicationCache;
};

export default cacheFactory;
