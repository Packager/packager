import { AcornNode } from "rollup";

export type ObjectProperty = {
  end: number;
  start: number;
  name?: string;
  type: string;
  object?: ObjectProperty;
  property?: ObjectProperty;
  value?: string;
};

export type NodeSource = {
  start: number;
  end: number;
  value: string;
  raw: string;
};

export type Node = AcornNode & {
  expression: Node;
  operator?: string;
  callee?: ObjectProperty;
  left?: Node & ObjectProperty;
  right?: Node & ObjectProperty;
  object?: ObjectProperty;
  property?: ObjectProperty;
  declaration?: ObjectProperty;
  specifiers?: Array<NodeSpecifier>;
  source?: NodeSource;
};

export type NodeSpecifier = {
  end: number;
  exported?: ObjectProperty;
  imported?: ObjectProperty;
  local: ObjectProperty;
  start: number;
  type: string;
};

export type ModuleInfoExport = Record<string, string>;
