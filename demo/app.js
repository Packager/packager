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
        code: `import Vue from 'vue';

export default function () {
    console.log(Vue);
    return 'test!';
}`
    }
];

(async () => {
    try {
        const bundleOptions = {
            // externalModules: {
            //     vue: "16.11"
            // }
        };

        const { code } = await pkger.bundle(files, bundleOptions);
        eval(code);
    } catch (e) {
        //
    }
})();
