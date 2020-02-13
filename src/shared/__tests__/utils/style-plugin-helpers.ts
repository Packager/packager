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
