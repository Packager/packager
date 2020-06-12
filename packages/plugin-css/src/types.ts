import {
  Processor,
  Parser,
  Stringifier,
  AtRule,
  AtRuleNewProps,
} from "postcss";

export interface Postcss {
  (plugins?: Array<any>): Processor;
  parse: Parser;
  stringify: Stringifier;
  atRule: (defaults?: AtRuleNewProps) => AtRule;
}
