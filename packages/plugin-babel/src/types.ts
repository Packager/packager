import { AcornNode } from "rollup";

export type LeftRight = {
  end: number;
  start: number;
  type: string;
  object: ObjectProperty;
  property: ObjectProperty;
};

export type ObjectProperty = {
  end: number;
  start: number;
  name: string;
  type: string;
  object?: ObjectProperty;
  property?: ObjectProperty;
};

export type Node = AcornNode & {
  expression: Node;
  operator?: string;
  callee?: ObjectProperty;
  left?: Node & LeftRight;
  right?: Node & LeftRight;
};
