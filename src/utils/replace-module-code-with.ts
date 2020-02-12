/**
 * Slightly modified version of:
 *      https://github.com/rollup/plugins/blob/master/packages/replace
 * by https://github.com/rollup
 */

declare var MagicString: any;

const escape = (str: string) => {
    return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
};

const ensureFunction = (functionOrValue: Function | any) => {
    if (typeof functionOrValue === "function") return functionOrValue;
    return () => functionOrValue;
};

const longest = (a: string, b: string) => {
    return b.length - a.length;
};

const getReplacements = (options: any) => {
    if (options.values) {
        return Object.assign({}, options.values);
    }
    const values = Object.assign({}, options);
    delete values.delimiters;
    delete values.include;
    delete values.exclude;
    delete values.sourcemap;
    delete values.sourceMap;
    return values;
};

const mapToFunctions = (object: any) => {
    return Object.keys(object).reduce((fns, key) => {
        const functions: any = Object.assign({}, fns);
        functions[key] = ensureFunction(object[key]);
        return functions;
    }, {});
};

export default (options: any = {}) => {
    const { delimiters } = options;
    const functionValues: any = mapToFunctions(getReplacements(options));
    const keys = Object.keys(functionValues)
        .sort(longest)
        .map(escape);
    const pattern = delimiters
        ? new RegExp(
              `${escape(delimiters[0])}(${keys.join("|")})${escape(
                  delimiters[1]
              )}`,
              "g"
          )
        : new RegExp(`\\b(${keys.join("|")})\\b`, "g");

    const codeHasReplacements = (
        code: string,
        id: string,
        magicString: any
    ) => {
        let result = false;
        let match;

        // eslint-disable-next-line no-cond-assign
        while ((match = pattern.exec(code))) {
            result = true;

            const start = match.index;
            const end = start + match[0].length;
            const replacement = String(functionValues[match[1]](id));
            magicString.overwrite(start, end, replacement);
        }
        return result;
    };

    const isSourceMapEnabled = () => {
        return options.sourceMap !== false && options.sourcemap !== false;
    };

    return (code: string, id: string) => {
        if (!MagicString) {
            throw new Error(
                "MagicString is required to use the replace plugin."
            );
        }

        const magicString = new MagicString(code);
        if (!codeHasReplacements(code, id, magicString)) {
            return null;
        }

        const result: any = { code: magicString.toString() };
        if (isSourceMapEnabled()) {
            result.map = magicString.generateMap({ hires: true });
        }
        return result;
    };
};
