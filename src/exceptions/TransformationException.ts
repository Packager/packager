export default class TransformationException extends Error {
    constructor(filePath: string, transformerName?: string) {
        super(
            `Failed to transform ${filePath}${
                transformerName ? " in" + transformerName : ""
            }.`
        );
    }
}
