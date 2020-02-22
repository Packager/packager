import { createPlugin } from "../create-plugin";

describe("create plugin", () => {
    it("returns the expected result", () => {
        const plugin = {
            name: "vue-plugin",
            extensions: [".vue"]
        };

        expect(createPlugin(plugin)).toEqual(plugin);
    });
});
