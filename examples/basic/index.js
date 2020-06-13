const packager = new Packager();
packager.registerPlugins([
  babelPlugin,
  esbuildPlugin,
  jsonPlugin,
  cssPlugin,
  stylusPlugin,
]);

const files = [
  {
    path: "/src/app.js",
    entry: true,
    code: `import { React, ReactDOM } from 'es-react';
import Greeting from './greeting';

import './style.css';
import './style.styl';

ReactDOM.render(
  React.createElement('h1', null,  Greeting('Hello')),
  document.getElementById('app1')
);`,
  },
  {
    path: "/src/greeting.ts",
    code: `export default function (message: string): string {
  return message;
}`,
  },
  {
    path: "/src/style.css",
    code: `@import "./more.css";

body {
  color: red;
}`,
  },
  {
    path: "/src/more.css",
    code: `body {
  text-decoration: underline;
}`,
  },
  {
    path: "/src/style.styl",
    code: `body {
  font: 14px/1.5 Helvetica, arial, sans-serif;
  #logo {
    border-radius: 5px;
  }
}`,
  },
];

const files2 = [
  {
    path: "/src/app.js",
    code: `const greeting = require('./greet');
  
console.log(greeting('hello world'));
`,
    entry: true,
  },
  {
    path: "/src/greet.ts",
    code: `export default function (message: string): string {
  return message;
}`,
  },
  {
    path: "/src/styles.styl",
    code: `body {
  background: red;
  div {
    color: white;
  }
}`,
  },
];

(async () => {
  try {
    console.time("first");
    const bundle1 = await packager.bundle(files2);
    console.log(bundle1);
    eval(bundle1.code);
    console.timeEnd("first");
  } catch (e) {
    console.error(e);
  }
})();
