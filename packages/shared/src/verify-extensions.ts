import { VerifyExtensions } from "../types";
import isModuleExternal from "./is-module-external";

export default (extensions: string[]): VerifyExtensions => {
    const regex = new RegExp(`\\${extensions.join("$|\\")}$`, "i");

    return (path: string, ignoreExternal: boolean = true): boolean => {
        const external = isModuleExternal(path);

        return (
            regex.test(path) &&
            ((external && !ignoreExternal) || !external ? true : false)
        );
    };
};
