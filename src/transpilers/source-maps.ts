/**
 * @todo Fix sourcemaps because they're inaccurate.
 */

self.importScripts("https://unpkg.com/source-map/dist/source-map.js");

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
