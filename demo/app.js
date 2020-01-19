const pkger = new Packager({
    sourcemaps: true
});

const files = [
    {
        name: "app.js",
        path: "/src/app.js",
        entry: true,
        code: `import Vue123 from 'vue';
import VueRouter from 'vue-router';
import jQuery from 'jquery';
import test from './test.js'

console.log(Vue123);
console.log(VueRouter);
console.log(jQuery);

console.log(test());`
    },
    {
        name: "test.js",
        path: "/src/test.js",
        code: `import another from './another';

export default function () {
    console.log(another());
    return 'test!';
}`
    },
    {
        name: "another.js",
        path: "/src/another.js",
        code: `export default function () {
    return 'another!';
}`
    }
];

(async () => {
    try {
        console.time("first");
        const { code } = await pkger.bundle(files, {});
        eval(code);
        console.timeEnd("first");

        setTimeout(async () => {
            console.time("second");
            const { code } = await pkger.bundle(files, {});
            eval(code);
            console.timeEnd("second");
        }, 3000);
    } catch (e) {
        //
    }
})();
