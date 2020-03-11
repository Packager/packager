/**
 * @todo Fix sourcemaps because they're inaccurate.
 */

const fetchScript = (url: string) => {
    if (typeof self.importScripts === "function") {
        self.importScripts(url);
    } else {
        fetch(url)
            .then(res => res.text())
            // @ts-ignore ignore eval :o
            .then(text => eval(text));
    }
};

fetchScript("https://unpkg.com/source-map/dist/source-map.js");

const generateSourceMap = (
    filePath: string,
    originalCode: string,
    generatedCode: string
) => {
    // @ts-ignore
    const map = new self.sourceMap.SourceMapGenerator({ file: filePath });
    map.setSourceContent(filePath, originalCode);
    generatedCode.split(/\r?\n/g).forEach((line: string, index: number) => {
        if (line) {
            map.addMapping({
                source: filePath,
                original: { line: index + 1, column: 0 },
                generated: { line: index + 1, column: 0 }
            });
        }
    });

    return map.toJSON();
};

// @ts-ignore
self.generateSourceMap = generateSourceMap;

export default generateSourceMap;
