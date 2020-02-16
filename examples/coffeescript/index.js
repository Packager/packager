const packager = new Packager();

const files = [
    {
        name: "app.js",
        path: "/src/app.js",
        entry: true,
        code: `import greeting from './greeting.coffee';
        
document.getElementById('app').innerText = greeting('World');`
    },
    {
        name: "greeting.coffee",
        path: "/src/greeting.coffee",
        code: `export default (name) -> "Hello, #{ name }"`
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
