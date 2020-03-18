const packager = new Packager();
packager.registerPlugin(commonjsPlugin);

const files = [
  {
    name: "app.js",
    path: "/src/app.js",
    entry: true,
    code: `const greeting = require('./greeting');
const test = require('./test');

console.log(test());

document.getElementById('app').innerText = greeting('CommonJS');`
  },
  {
    name: "greeting.js",
    path: "/src/greeting.js",
    code: `function greeting (name) {
    return 'Hello world from ' + name;
}

module.exports = greeting;`
  },
  {
    name: "test.js",
    path: "/src/test.js",
    code: `export default function () {
    return 'hello world';
}`
  }
];

(async () => {
  try {
    const bundle = await packager.bundle(files);
    eval(bundle.code);
  } catch (e) {
    console.error(e);
  }
})();
