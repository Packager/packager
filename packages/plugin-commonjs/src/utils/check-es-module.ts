import { tryParse } from "./helpers";

const importExportDeclaration = /^(?:Import|Export(?:Named|Default))Declaration/;
export default function (parse, code, id) {
  const ast = tryParse(parse, code, id);

  let isEsModule = false;
  for (const node of ast.body) {
    if (node.type === "ExportDefaultDeclaration")
      return { isEsModule: true, hasDefaultExport: true, ast };
    if (node.type === "ExportNamedDeclaration") {
      isEsModule = true;
      for (const specifier of node.specifiers) {
        if (specifier.exported.name === "default") {
          return { isEsModule: true, hasDefaultExport: true, ast };
        }
      }
    } else if (importExportDeclaration.test(node.type)) isEsModule = true;
  }

  return { isEsModule, hasDefaultExport: false, ast };
}
