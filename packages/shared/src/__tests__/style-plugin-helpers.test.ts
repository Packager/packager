import { stylePluginHelpers } from "../";

const { generateExport } = stylePluginHelpers;

export const test1 =
  `export default function addStyles () {` +
  `const tag = document.createElement('style');` +
  `tag.type = 'text/css';` +
  `tag.appendChild(document.createTextNode(\`* { color: red; }\`));` +
  `tag.setAttribute('data-src', 'red.css');` +
  `document.head.appendChild(tag);` +
  `} addStyles();`;

export const test2 =
  `function addStyles () {` +
  `const tag = document.createElement('style');` +
  `tag.type = 'text/css';` +
  `tag.appendChild(document.createTextNode(\`* { color: red; }\`));` +
  `tag.setAttribute('data-src', 'red.css');` +
  `document.head.appendChild(tag);` +
  `} addStyles();`;

describe("style plugin helpers", () => {
  it("should generate a string with a function and a default export", () => {
    const file = {
      code: "* { color: red; }",
      path: "red.css"
    };

    expect(generateExport(file)).toMatch(test1);
  });

  it("should generate a string with a function but without a default export", () => {
    const file = {
      code: "* { color: red; }",
      path: "red.css"
    };

    expect(generateExport(file, false)).toMatch(test2);
  });
});
