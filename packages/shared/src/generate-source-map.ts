/**
 * @todo Fix sourcemaps because they're inaccurate.
 */

declare global {
  interface Window {
    sourceMap: any;
  }
}

const fetchScript = (url: string) => {
  if (typeof self.importScripts === "function") {
    return self.importScripts(url);
  } else if (typeof fetch === "function") {
    return (
      fetch(url)
        .then(res => res.text())
        // @ts-ignore ignore eval :o
        .then(text => eval(text))
    );
  }
  return false;
};

if (!self.sourceMap) {
  fetchScript("https://unpkg.com/source-map/dist/source-map.js");
}

const generateSourceMap = (
  filePath: string,
  originalCode: string,
  generatedCode: string
) => {
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
