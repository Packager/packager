const packager = new Packager();

const files = [
    {
        name: "app.js",
        path: "/src/app.js",
        entry: true,
        code: `const greeting = require('./greeting');

document.getElementById('app').innerText = greeting('World');`
    },
    {
        name: "greeting.js",
        path: "/src/greeting.js",
        code: `function greeting (name) {
    return 'Hello, ' + name;
}

module.exports = greeting;`
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
