const packager = new Packager();

const files = [
    {
        name: "app.ts",
        path: "/src/app.ts",
        entry: true,
        code: `import Greeting from './Greeting';

const el = document.getElementById('app');
el.innerText = Greeting('World');`
    },
    {
        name: "Greeting.ts",
        path: "/src/Greeting.ts",
        code: `export default function (name: string): string {
    return 'Hello, ' + name;
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
