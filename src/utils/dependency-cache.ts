const cache = new Map();

export type Dependency = {
    module: string;
    path: string;
    code: string;
};

export type DependencyCache = {
    get: (name: string) => Dependency | undefined;
    getAll: () => { [name: string]: Dependency };
    set: (name: string, value: Dependency) => boolean;
    has: (name: string) => boolean;
    delete: (name: string) => boolean;
    clear: () => void;
};

export default {
    get(name: string): Dependency | undefined {
        return cache.get(name);
    },
    getAll(): { [name: string]: Dependency } {
        return Array.from(cache.entries()).reduce(
            (acc, val) => ({
                ...acc,
                [val[0]]: val[1] || null
            }),
            {}
        );
    },
    set(name: string, value: Dependency): boolean {
        if (name == null || name == "") {
            return false;
        }

        cache.set(name, value);
        return this.has(name);
    },
    has(name: string): boolean {
        return Boolean(cache.get(name));
    },
    delete(name: string): boolean {
        return cache.delete(name);
    },
    clear(): void {
        cache.clear();
    }
} as DependencyCache;
