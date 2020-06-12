import { File } from "packager";

export const generateExport = (
  file: File,
  prependExportDefault: boolean = true
) =>
  `${prependExportDefault ? "export default " : ""}function addStyles () {` +
  `const tag = document.createElement('style');` +
  `tag.type = 'text/css';` +
  `tag.appendChild(document.createTextNode(\`${file.code}\`));` +
  `tag.setAttribute('data-src', '${file.path}');` +
  `document.head.appendChild(tag);` +
  `} addStyles();`;
