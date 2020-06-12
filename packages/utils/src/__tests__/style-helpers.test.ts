import { generateExport } from "../style-helpers";

describe("style plugin helpers", () => {
  it("should generate a string with a function and a default export", () => {
    const file = {
      code: "* { color: red; }",
      path: "red.css",
    };

    expect(generateExport(file)).toMatch(
      `export default function addStyles () {` +
        `const tag = document.createElement('style');` +
        `tag.type = 'text/css';` +
        `tag.appendChild(document.createTextNode(\`* { color: red; }\`));` +
        `tag.setAttribute('data-src', 'red.css');` +
        `document.head.appendChild(tag);` +
        `} addStyles();`
    );
  });

  it("should generate a string with a function without the export", () => {
    const file = {
      code: "* { color: red; }",
      path: "red.css",
    };

    expect(generateExport(file, false)).toMatch(
      `function addStyles () {` +
        `const tag = document.createElement('style');` +
        `tag.type = 'text/css';` +
        `tag.appendChild(document.createTextNode(\`* { color: red; }\`));` +
        `tag.setAttribute('data-src', 'red.css');` +
        `document.head.appendChild(tag);` +
        `} addStyles();`
    );
  });
});
