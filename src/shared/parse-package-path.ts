import { ParsedPackagePath } from "packager/types";

export default (name: string): ParsedPackagePath => {
    if (!name || name == "") {
        return {
            name: null,
            version: null,
            path: null
        };
    }
    const scopedRegex = /^(@[^/]+\/[^/@]+)(?:([\s\S]+))?/;
    const regRegex = /^([^/@]+)(?:([\s\S]+))?/;

    const extracted = name.startsWith("@")
        ? scopedRegex.exec(name)?.slice(1)
        : regRegex.exec(name)?.slice(1);

    if (extracted?.length) {
        const rest = extractRest(extracted[1] || null);

        return {
            name: extracted[0] || null,
            ...rest
        };
    }

    return {
        name: null,
        version: null,
        path: null
    };
};

const extractRest = (rest: string | null) => {
    if (!rest || rest == "") {
        return {
            version: null,
            path: null
        };
    }

    if (rest.startsWith("@")) {
        const extractedVersion = /@(.*?)\/(.*)/.exec(rest);

        if (extractedVersion) {
            const version = extractedVersion[1] || null;
            const path = extractedVersion[2] || null;

            return { version, path };
        }

        return {
            version: rest.substring(1) || null,
            path: null
        };
    } else if (!!rest && !!~rest.indexOf("@")) {
        const splitRest = rest.split("@");

        return {
            version: splitRest[1],
            path:
                splitRest[0].indexOf("/") === 0
                    ? splitRest[0].substring(1)
                    : splitRest[0]
        };
    }

    return {
        version: null,
        path: rest && rest.startsWith("/") ? rest.slice(1) : null
    };
};
