import isModuleExternal from "./is-module-external";

export type VerifyExtenions = (
    path: string,
    ignoreExternal?: boolean
) => boolean;

export default (extensions: string[]): VerifyExtenions => {
    const regex = new RegExp(`\\${extensions.join("$|\\")}$`, "i");

    return (path: string, ignoreExternal: boolean = true): boolean => {
        const external = isModuleExternal(path);

        return (
            regex.test(path) &&
            ((external && !ignoreExternal) || !external ? true : false)
        );
    };
};
