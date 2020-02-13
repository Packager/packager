import { File } from "@typedefs/packager";

export default (files: File[], forcePath?: string) => {
    const pkgMain = files.find(f => f.path === forcePath);
    const foundFile = pkgMain || files.find(f => f.entry);

    if (!foundFile) {
        throw Error(
            "You haven't specific an entry file. You can do so by adding 'entry: true' to one of your files or use the 'main' in a package.json file.."
        );
    }

    return foundFile;
};
