import { extname } from "packager/shared/path";
import transpilers from "packager/transpilers";

import { PackagerContext, Setup } from "packager/types";

export default function initialSetup(context: PackagerContext): Setup {
    const getAllLangsFromFiles = () =>
        context.files.reduce((acc: string[], curr: any) => {
            const extension: string = extname(curr.path).slice(1);
            if (!acc.includes(extension)) {
                acc.push(extension);
                return acc;
            }
            return acc;
        }, []);

    const usingUnsupportedFiles = () => {
        const givenLangs = getAllLangsFromFiles();
        const unsupportedExtensions = givenLangs.reduce(
            (acc: string[], curr: string) => {
                if (!transpilers[curr]) {
                    acc.push(curr);
                    return acc;
                }
                return acc;
            },
            []
        );

        return {
            extensions: unsupportedExtensions,
            unsupportedFiles: !!unsupportedExtensions.length
        };
    };

    return {
        name: "packager::setup::build-start",
        async buildStart(): Promise<void> {
            const { unsupportedFiles, extensions } = usingUnsupportedFiles();

            if (unsupportedFiles) {
                throw Error(
                    `Files with the following extensions are not supported yet: ${extensions.join(
                        ", "
                    )}.`
                );
            }
        }
    };
}
