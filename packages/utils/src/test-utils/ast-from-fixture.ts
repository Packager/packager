import * as acorn from "acorn";
import { walk } from "estree-walker";
import setupFixtureLoading from "../test-utils/load-fixture";
import { Node } from "../module-info/types";
import { RootNode } from "../types";

interface Options {
  fixturesRoot: string;
}

const acornOptions = {
  sourceType: "module",
} as acorn.Options;

export default function (options: Options) {
  const loadFixture = setupFixtureLoading({
    fixturesRoot: options.fixturesRoot,
  });

  return async function (
    fixturePath: string
  ): Promise<{ ast: RootNode; nodes: Array<Node> }> {
    const code = await loadFixture(fixturePath);
    const ast = acorn.parse(code, acornOptions) as RootNode;
    const nodes = [];

    walk(ast, {
      enter(node: Node) {
        nodes.push(node);
      },
    });

    return { ast, nodes };
  };
}
