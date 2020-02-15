import { File } from "packager/types/packager";

type ModifiedFile = {
    code: string;
    path: string;
};

export const generateExport = (
    file: File | ModifiedFile,
    prependExportDefault: boolean = true
) => {
    return (
        `${
            prependExportDefault ? "export default " : ""
        }function addStyles () {` +
        `const tag = document.createElement('style');` +
        `tag.type = 'text/css';` +
        `tag.appendChild(document.createTextNode(\`${file.code}\`));` +
        `tag.setAttribute('data-src', '${file.path}');` +
        `document.head.appendChild(tag);` +
        `} addStyles();`
    );
};

export const generateExportsForAllStyles = (
    styles: string[],
    filePath: string
) => generateExport({ path: filePath, code: styles.join("\n\n") }, false);
