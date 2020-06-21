import { Imports, Exports, NamedImports } from "./get-all-imports-exports";

const handleDefaultExport = (imports: Imports, exports: Exports) => {
  const results = {
    named: [],
  };

  // has it been default imported?
  const defaultImported = imports.default.find(
    (defaultImport) => defaultImport.import === exports.default.export
  );

  if (!defaultImported) {
    // has it been named imported?
    const nameImported = imports.named.find((namedImports) =>
      Object.values(namedImports.imports).find(
        (_import) => _import === exports.default.export
      )
    );

    if (!nameImported) {
      // has it been namespaced imported?
      const namespaceImported = imports.namespaced.find(
        (namespacedImports) =>
          namespacedImports.import === exports.default.export
      );

      if (!namespaceImported) {
        // has it been name exported? we check if source exists because it could be exporting a local var.
        const nameExported = exports.named.reduce((acc, curr) => {
          if (curr.source) {
            let tempImport;

            for (const keyExport in curr.exports) {
              if (curr.exports[keyExport] === "lolekaa") {
                tempImport = {
                  [keyExport]: curr.exports[keyExport],
                };

                break;
              }
            }

            if (!tempImport) {
              return acc;
            }

            return {
              imports: tempImport,
              source: curr.source,
            };
          }

          return acc;
        }, {} as NamedImports);

        // if it has, add it to the missing named imports
        if (Object.keys(nameExported).length) {
          results.named.push(nameExported);
        }
      }
    }
  }

  return results;
};

const handleNamedExports = (imports: Imports, exports: Exports) => {
  const results = {
    default: [],
    named: [],
  };

  const namedWithSource = exports.named.filter((named) => named.source);
  const { default: defaultNamed, named } = namedWithSource.reduce(
    (acc, curr) => {
      const defaultExport = curr.exports["default"];
      // do we have a default export and it's not already imported?
      if (
        defaultExport &&
        !imports.default.some((_import) => _import.source === curr.source)
      ) {
        acc.default.push({
          exports: {
            default: defaultExport,
          },
          source: curr.source,
        });
      }

      let namedExports = {};
      for (const keyExport in curr.exports) {
        const valExport = curr.exports[keyExport];
        if (valExport !== defaultExport) {
          const sourceImported = imports.named.find(
            (named) => named.source === curr.source
          );

          if (
            !sourceImported ||
            (sourceImported &&
              !Object.values(sourceImported).find(
                (_import) => _import === valExport
              ))
          ) {
            namedExports = Object.assign(namedExports, {
              [keyExport]: valExport,
            });
          }
        }
      }

      if (Object.keys(namedExports).length) {
        acc.named.push({
          exports: namedExports,
          source: curr.source,
        });
      }

      return acc;
    },
    { default: [], named: [] }
  );

  if (defaultNamed.length) {
    results.default.push(...defaultNamed);
  }

  if (named.length) {
    results.named.push(...named);
  }

  return results;
};

/**
 * The job of this function is to find all of the missing
 * imports for a given file. The reason why they are "missing"
 * is because if exports don't include corresponding imports
 * Packager will not be able to mount the export to the
 * __PACKAGER_CONTEXT__ on the window object because an "undefined"
 * error will be thrown.
 *
 * So if a file has:
 * export { X } from Y;
 *
 * We need to be able to catch that "X" so that later we can do:
 * import { X } from Y;
 * export { X } from Y;
 *
 * 1. If there is a default export
 *    1a. Check if it's not already imported (default, named, namespaced). If it is,
 *        we don't need to worry about but if it's not:
 *    1b. Check whether it's exported (named - as a var). If it is,
 *        add it to missing named imports but if it's not:
 *    1c. ignore as this is probably a local var in the file.
 * 2. If there are named exports
 *    2a. Check if they have a source. If they don't, we don't care about them
 *        as they have most likely been imported or a local but if they do:
 *    2b. Check if they have already been imported (default, named, namespaced). If they have,
 *        we don't need to worry but if they haven't:
 *    2c. We need to add them to default imports if their local name is default otherwise
 *        they need to be added to named imports.
 * 3. If there are "all" exports
 *    3a. Check if there already isn't a corresponding namespace imports. If there is,
 *        we can ignore it and if there isn't:
 *    3b. We need to add it to the namespaced missing imports.
 */
export default function (imports: Imports, exports: Exports) {
  const missingImports: Imports = {
    default: [],
    named: [],
    namespaced: [],
  };

  // 1. If there is a default export
  if (exports.default) {
    const { named } = handleDefaultExport(imports, exports);

    if (named.length) {
      missingImports.named.push(...named);
    }
  }

  // 2. If there are named exports
  if (exports.named.length) {
    const { default: defaultImports, named } = handleNamedExports(
      imports,
      exports
    );

    if (defaultImports.length) {
      missingImports.default.push(...defaultImports);
    }

    if (named.length) {
      missingImports.named.push(...named);
    }
  }

  // @todo 3. If there are "all" exports

  return missingImports;
}
