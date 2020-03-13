const packager = new Packager();
packager.registerPlugin(commonjsPlugin);

const files = [
    {
        name: "app.js",
        path: "/src/app.js",
        code: `import Vue from 'vue';

console.log(Vue);

new Vue({
    el: '#app',
    render: h => h('h1', 'Hello World from package.json support!')
});`
    },
    {
        name: "package.json",
        path: "/package.json",
        code: `{
    "name": "package-json-example",
    "main": "src/app.js",
    "dependencies": {
        "vue": "2.6.10"
    }
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
