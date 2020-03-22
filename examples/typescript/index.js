const packager = new Packager();
packager.registerPlugin(typescriptPlugin);

const files = [
  {
    name: "app.ts",
    path: "/src/app.ts",
    entry: true,
    code: `import Greeting from './Greeting';

const el = document.getElementById('app');
el.innerText = Greeting('world');`
  },
  {
    name: "Greeting.ts",
    path: "/src/Greeting.ts",
    code: `export default function (name: string): string {
    return 'Hello ' + name + ' from TypeScript!';
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
