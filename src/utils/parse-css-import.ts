/**
 * Slightly modified version of:
 *      https://github.com/kevva/parse-import/blob/master/index.js
 * by https://github.com/kevva
 */

const getPath = (str: string) =>
    /(?:url\()(?:.*?)(?:\))|(["'])(?:[^"')]+)\1/gi
        .exec(str)![0]
        .replace(/(?:url\()/gi, "")
        .replace(/(?:\))/g, "")
        .replace(/(?:["'])/g, "")
        .trim();

const getCondition = (str: string) =>
    str
        .replace(/(?:url\()(?:.*?)(?:\))|(["'])(?:[^"')]+)\1/gi, "")
        .replace(/(?:@import)(?:\s)*/g, "")
        .trim();

export default function(cssImport: string) {
    cssImport = cssImport.replace(/(?:;)$/g, "");

    return {
        path: getPath(cssImport),
        condition: getCondition(cssImport) || null,
        rule: cssImport
    };
}
