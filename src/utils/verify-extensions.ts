export default function(extensions: string[]) {
    const regex = new RegExp(`\\${extensions.join("$|\\")}$`, "i");

    return function(path: string) {
        return regex.test(path);
    };
}
