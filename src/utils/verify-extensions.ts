import isExternal from "./is-external";

export default function(extensions: string[]) {
    const regex = new RegExp(`\\${extensions.join("$|\\")}$`, "i");

    return function(path: string, ignoreExternal: boolean = true) {
        const external = isExternal(path);

        return (
            regex.test(path) &&
            ((external && !ignoreExternal) || !external ? true : false)
        );
    };
}
