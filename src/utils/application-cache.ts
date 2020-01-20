export type ApplicationCache = {
    get: (name: string) => any | undefined;
    getAll: () => { [name: string]: any };
    set: (name: string, value: any) => boolean;
    has: (name: string) => boolean;
    delete: (name: string) => boolean;
    clear: () => void;
};

export default function() {
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
            return Boolean(cache.get(name));
        },
        delete(name: string): boolean {
            return cache.delete(name);
        },
        clear(): void {
            cache.clear();
        }
    } as ApplicationCache;
}
