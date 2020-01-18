const pkger = new Packager({
    sourcemaps: true
});

const files = [
    {
        name: "app.js",
        path: "/src/app.js",
        entry: true,
        code: `import test from './test.js'

console.log(test());`
    },
    {
        name: "test.js",
        path: "/src/test.js",
        code: `export default function () {
    return 'test!';
}`
    }
];

(async () => {
    const { code } = await pkger.bundle(files);
    eval(code);
})();
