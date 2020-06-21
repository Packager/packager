const packager = new Packager();
packager.registerPlugins([
  babelPlugin,
  esbuildPlugin,
  jsonPlugin,
  cssPlugin,
  lessPlugin,
  stylusPlugin,
]);

const fetchDataSet = async (name) => {
  return await (await fetch(`../../datasets/${name}`)).json();
};

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
    code: `
import './styles.css';`,
    entry: true,
  },
  {
    path: "/src/styles.css",
    code: `@import "./testing.css";
@import "./testing/lol.css";`,
  },
  {
    path: "/src/styles.less",
    code: `@import "./vars.less";
  @import-name: testing;
  @import "./@{import-name}.css";

  body {
    color: @blue;
  }`,
  },
  {
    path: "/src/vars.less",
    code: `@import "testing/lol.css";
  @blue: blue;`,
  },
  {
    path: "/src/testing.css",
    code: `body {
    background: red;
  }`,
  },
  {
    path: "/src/testing/lol.css",
    code: `body {
    text-decoration: underline;
  }`,
  },
];

const files3 = [
  {
    path: "/src/app.js",
    code: `
// import Test from './test';
// console.log(Test);

import Vue, { extend } from 'vue';
import React, { Component } from 'es-react';
import Svelte, { SvelteComponent } from 'svelte';
console.log({
  Vue, extend,
  React, Component,
  Svelte, SvelteComponent
});
`,
    entry: true,
  },
  {
    path: "/src/test.ts",
    code: `
const vars = {
  greeting: {
    helloWorld: 'hello!'
  }
};

export default vars.greeting.helloWorld;
`,
  },
];

(async () => {
  try {
    // const datasetFiles = await fetchDataSet("collect.js.json");
    console.time("first time");
    const bundle1 = await packager.bundle(files3);
    eval(bundle1.code);
    console.timeEnd("first time");
    console.time("second time with caching");
    const bundle2 = await packager.bundle(files3);
    eval(bundle2.code);
    console.timeEnd("second time with caching");
  } catch (e) {
    console.error(e);
  }
})();
