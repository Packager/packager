const absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|\/])/;
const relativePath = /^\.?\.\//;

export function isAbsolute(path: string): boolean {
    return absolutePath.test(path);
}

export function isRelative(path: string): boolean {
    return relativePath.test(path);
}

export function basename(path: string): string | undefined {
    return path.split(/(\/|\\)/).pop();
}

export function dirname(path: string): string {
    const match = /(\/|\\)[^\/\\]*$/.exec(path);
    if (!match) return ".";

    const dir = path.slice(0, -match[0].length);

    // If `dir` is the empty string, we're at root.
    return dir ? dir : "/";
}

export function extname(path: string): string {
    const bname = basename(path);
    if (!bname) return "";
    const match = /\.[^\.]+$/.exec(bname);
    if (!match) return "";
    return match[0];
}

export function relative(from: string, to: string): string {
    const fromParts = from.split(/[\/\\]/).filter(Boolean);
    const toParts = to.split(/[\/\\]/).filter(Boolean);

    while (fromParts[0] && toParts[0] && fromParts[0] === toParts[0]) {
        fromParts.shift();
        toParts.shift();
    }

    while (toParts[0] === "." || toParts[0] === "..") {
        const toPart = toParts.shift();
        if (toPart === "..") {
            fromParts.pop();
        }
    }

    while (fromParts.pop()) {
        toParts.unshift("..");
    }

    return normalize(toParts.join("/"));
}

export function resolve(...paths: string[]) {
    let resolvedParts = paths.shift()!.split(/[\/\\]/);

    paths.forEach(path => {
        if (isAbsolute(path)) {
            resolvedParts = path.split(/[\/\\]/);
        } else {
            const parts = path.split(/[\/\\]/);

            while (parts[0] === "." || parts[0] === "..") {
                const part = parts.shift();
                if (part === "..") {
                    resolvedParts.pop();
                }
            }

            resolvedParts.push.apply(resolvedParts, parts);
        }
    });

    return normalize(resolvedParts.join("/"));
}

export function normalize(path: string): string {
    return path.replace(/\/\//gi, "/");
}

export default {
    isAbsolute,
    isRelative,
    basename,
    dirname,
    extname,
    relative,
    resolve,
    normalize
};
