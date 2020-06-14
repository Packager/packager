import { Root, Result } from "postcss";
import parseStatements from "./parse-statements";
import joinMedia from "./join-media";
import processContent from "./process-content";
import { Postcss, ImportPluginOptions } from "../../types";

/**
 * Plugin ported from https://github.com/postcss/postcss-import with some minor
 * adjustments for Packager.
 *
 * Full credits to the PostCSS team
 */

const importPlugin = (options: ImportPluginOptions) => (
  styles: Root,
  result: Result
) => {
  options = { ...options, skipDuplicates: true };

  const state = {
    importedFiles: {},
    hashFiles: {},
  };

  if (styles.source && styles.source.input && styles.source.input.file) {
    state.importedFiles[styles.source.input.file] = {};
  }

  return parseStyles(result, styles, options, state, []).then((bundle) => {
    applyRaws(bundle);
    applyMedia(bundle, options.postcss);
    applyStyles(bundle, styles);
  });
};

function applyRaws(bundle) {
  bundle.forEach((stmt, index) => {
    if (index === 0) return;

    if (stmt.parent) {
      const before = stmt.parent.node.raws.before;
      if (stmt.type === "nodes") stmt.nodes[0].raws.before = before;
      else stmt.node.raws.before = before;
    } else if (stmt.type === "nodes") {
      stmt.nodes[0].raws.before = stmt.nodes[0].raws.before || "\n";
    }
  });
}

function applyMedia(bundle, postcss: Postcss) {
  bundle.forEach((stmt) => {
    if (!stmt.media.length) return;
    if (stmt.type === "import") {
      stmt.node.params = `${stmt.fullUri} ${stmt.media.join(", ")}`;
    } else if (stmt.type === "media") stmt.node.params = stmt.media.join(", ");
    else {
      const nodes = stmt.nodes;
      const parent = nodes[0].parent;
      const mediaNode = postcss.atRule({
        name: "media",
        params: stmt.media.join(", "),
        source: parent.source,
      });

      parent.insertBefore(nodes[0], mediaNode);

      // remove nodes
      nodes.forEach((node) => {
        node.parent = undefined;
      });

      // better output
      nodes[0].raws.before = nodes[0].raws.before || "\n";

      // wrap new rules with media query
      mediaNode.append(nodes);

      stmt.type = "media";
      stmt.node = mediaNode;
      delete stmt.nodes;
    }
  });
}

function applyStyles(bundle, styles) {
  styles.nodes = [];

  // Strip additional statements.
  bundle.forEach((stmt) => {
    if (stmt.type === "import") {
      stmt.node.parent = undefined;
      styles.append(stmt.node);
    } else if (stmt.type === "media") {
      stmt.node.parent = undefined;
      styles.append(stmt.node);
    } else if (stmt.type === "nodes") {
      stmt.nodes.forEach((node) => {
        node.parent = undefined;
        styles.append(node);
      });
    }
  });
}

function parseStyles(
  result,
  styles,
  options: ImportPluginOptions,
  state,
  media
) {
  const statements = parseStatements(result, styles);

  return Promise.resolve(statements)
    .then((stmts) => {
      // process each statement in series
      return stmts.reduce((promise, stmt) => {
        return promise.then(() => {
          stmt.media = joinMedia(media, stmt.media || []);

          // skip protocol base uri (protocol://url) or protocol-relative
          if (stmt.type !== "import" || /^(?:[a-z]+:)?\/\//i.test(stmt.uri)) {
            return;
          }

          return resolveImportId(result, stmt, options, state);
        });
      }, Promise.resolve());
    })
    .then(() => {
      const imports = [];
      const bundle = [];

      // squash statements and their children
      statements.forEach((stmt) => {
        if (stmt.type === "import") {
          if (stmt.children) {
            stmt.children.forEach((child, index) => {
              if (child.type === "import") imports.push(child);
              else bundle.push(child);
              // For better output
              if (index === 0) child.parent = stmt;
            });
          } else imports.push(stmt);
        } else if (stmt.type === "media" || stmt.type === "nodes") {
          bundle.push(stmt);
        }
      });

      return imports.concat(bundle);
    });
}

function resolveImportId(result, stmt, options: ImportPluginOptions, state) {
  const atRule = stmt.node;
  let sourceFile;
  if (atRule.source && atRule.source.input && atRule.source.input.file) {
    sourceFile = atRule.source.input.file;
  }
  const parentId = sourceFile;

  return Promise.resolve(options.resolver(stmt.uri, parentId))
    .then((resolved) =>
      loadImportContent(result, stmt, resolved, options, state)
    )
    .then((result) => {
      stmt.children = result.reduce((result, statements) => {
        return statements ? result.concat(statements) : result;
      }, []);
    });
}

function loadImportContent(
  result,
  stmt,
  filename,
  options: ImportPluginOptions,
  state
) {
  const atRule = stmt.node;
  const media = stmt.media;
  if (options.skipDuplicates) {
    // skip files already imported at the same scope
    if (state.importedFiles[filename] && state.importedFiles[filename][media]) {
      return;
    }

    // save imported files to skip them next time
    if (!state.importedFiles[filename]) state.importedFiles[filename] = {};
    state.importedFiles[filename][media] = true;
  }

  return Promise.resolve(options.loader(filename)).then((content) => {
    if (content.trim() === "") {
      result.warn(`${filename} is empty`, { node: atRule });
      return;
    }

    // skip previous imported files not containing @import rules
    if (state.hashFiles[content] && state.hashFiles[content][media]) return;

    return processContent(result, content, filename, options).then(
      (importedResult) => {
        const styles = importedResult.root;
        result.messages = result.messages.concat(importedResult.messages);

        if (options.skipDuplicates) {
          const hasImport = styles.some((child) => {
            return child.type === "atrule" && child.name === "import";
          });
          if (!hasImport) {
            // save hash files to skip them next time
            if (!state.hashFiles[content]) state.hashFiles[content] = {};
            state.hashFiles[content][media] = true;
          }
        }

        // recursion: import @import from imported file
        return parseStyles(result, styles, options, state, media);
      }
    );
  });
}

export default importPlugin;
