import {
  RootNode,
  AstNode,
  nodeHasDefaultImports,
  nodeHasNamedImports,
  nodeHasNamespaceImports,
  nodeHasDefaultExport,
  nodeHasNamedExports,
  nodeHasExportAll,
} from "packager-pluginutils";
import { walk } from "estree-walker";

type DefaultImport = {
  import: string;
  source: string;
};
export type NamedImports = {
  imports: Record<string, string>;
  source: string;
};
type NamespaceImport = {
  import: string;
  source: string;
};
type DefaultExport = {
  export: string;
};
type NamedExports = {
  exports: Record<string, string>;
  source?: string;
};
type ExportAll = {
  source: string;
};

export interface Imports {
  default: Array<DefaultImport>;
  named: Array<NamedImports>;
  namespaced: Array<NamespaceImport>;
}

export interface Exports {
  default: DefaultExport | null;
  named: Array<NamedExports>;
  all: Array<ExportAll>;
}

interface ImportsExports {
  imports: Imports;
  exports: Exports;
}

const getDefaultImport = (node: AstNode): DefaultImport => {
  const defaultImport = node?.specifiers?.find(
    (spec) => spec.type === "ImportDefaultSpecifier"
  );

  if (!defaultImport) {
    return null;
  }

  return {
    import: defaultImport.local.name,
    source: node.source.value,
  };
};

const getNamedImports = (node: AstNode): NamedImports => {
  if (!node.specifiers?.length) {
    return null;
  }

  const namedImports = node.specifiers
    .filter((spec) => spec.type === "ImportSpecifier")
    .reduce(
      (acc, curr) => ({
        ...acc,
        [curr.imported.name]: curr.local.name,
      }),
      {}
    );

  return {
    imports: namedImports,
    source: node.source.value,
  };
};

const getNamespaceImports = (node: AstNode): NamespaceImport => {
  const namespaceImport = node?.specifiers?.find(
    (spec) => spec.type === "ImportNamespaceSpecifier"
  );

  if (namespaceImport) {
    return null;
  }

  return {
    import: namespaceImport.local.name,
    source: node.source.value,
  };
};

const getDefaultExport = (node: AstNode, code: string): DefaultExport => {
  let defaultExport = node.declaration.name;

  if (!defaultExport) {
    defaultExport = code.substring(
      node.declaration.start,
      node.declaration.end
    );
  }

  return {
    export: defaultExport,
  };
};

const getNamedExports = (node: AstNode): NamedExports => {
  if (!node.specifiers?.length) {
    return null;
  }

  const namedExports = node.specifiers.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.local.name]: curr.exported.name,
    }),
    {}
  );

  return {
    source: node.source?.value,
    exports: namedExports,
  };
};

const getExportAll = (node: AstNode): ExportAll => {
  if (!node.source.value) {
    return null;
  }

  return {
    source: node.source.value,
  };
};

/**
 * This util is responsible for returning all types of exports.
 */
export default function (rootNode: RootNode, code: string): ImportsExports {
  const importsExports: ImportsExports = {
    imports: {
      default: [],
      named: [],
      namespaced: [],
    },
    exports: {
      default: null,
      named: [],
      all: [],
    },
  };

  walk(rootNode, {
    enter(node: AstNode) {
      if (nodeHasDefaultImports(node)) {
        importsExports.imports.default.push(getDefaultImport(node));
      }

      if (nodeHasNamedImports(node)) {
        importsExports.imports.named.push(getNamedImports(node));
      }

      if (nodeHasNamespaceImports(node)) {
        importsExports.imports.namespaced.push(getNamespaceImports(node));
      }

      if (nodeHasDefaultExport(node, false)) {
        importsExports.exports.default = getDefaultExport(node, code);
      }

      if (nodeHasNamedExports(node)) {
        importsExports.exports.named.push(getNamedExports(node));
      }

      if (nodeHasExportAll(node)) {
        importsExports.exports.all.push(getExportAll(node));
      }
    },
  });

  return importsExports;
}
