import path from "path";
import setupAstFixture from "../../test-utils/ast-from-fixture";
import { hasDefaultExport } from "../es-modules";

describe("es-modules", () => {
  const loadAstFixture = setupAstFixture({
    fixturesRoot: path.resolve(__dirname, "../__fixtures__"),
  });

  it("should find and return simple export default", async () => {
    const { nodes } = await loadAstFixture("./simple-default-export.ts");
    const defaultNode = nodes.find((node) => hasDefaultExport(node));

    expect(Boolean(defaultNode)).toBeTruthy();
  });
});
