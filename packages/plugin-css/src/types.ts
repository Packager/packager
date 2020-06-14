import {
  Processor,
  Parser,
  Stringifier,
  AtRule,
  AtRuleNewProps,
} from "postcss";
import { WebWorkerContext } from "packager";

export interface Postcss {
  (plugins?: Array<any>): Processor;
  parse: Parser;
  stringify: Stringifier;
  atRule: (defaults?: AtRuleNewProps) => AtRule;
}

export interface ImportPluginOptions {
  postcss: Postcss;
  resolver: (moduleId: string, parentId: string) => Promise<string | null>;
  loader: (moduleId: string) => Promise<string>;
  skipDuplicates?: boolean;
}

// export declare function importPlugin(options: ImportPluginOptions): void;

export declare function transpileCssFile(
  context: WebWorkerContext,
  postcss: Postcss
): Promise<WebWorkerContext>;
