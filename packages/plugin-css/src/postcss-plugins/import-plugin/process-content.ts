import { ImportPluginOptions } from "../../types";

export default function (
  result,
  content,
  filename,
  options: ImportPluginOptions
) {
  const parserList = [];

  // Syntax support:
  if (result.opts.syntax && result.opts.syntax.parse) {
    parserList.push(result.opts.syntax.parse);
  }

  // Parser support:
  if (result.opts.parser) parserList.push(result.opts.parser);
  // Try the default as a last resort:
  parserList.push(null);

  return runPostcss(content, filename, options, parserList);
}

function runPostcss(
  content,
  filename,
  options: ImportPluginOptions,
  parsers,
  index?: number
) {
  if (!index) index = 0;
  return options
    .postcss([])
    .process(content, {
      from: filename,
      parser: parsers[index],
    })
    .catch((err) => {
      // If there's an error, try the next parser
      index++;
      // If there are no parsers left, throw it
      if (index === parsers.length) throw err;
      return runPostcss(content, filename, options, parsers, index);
    });
}
