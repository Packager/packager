const pkger = new Packager({
    sourcemaps: true
});

const files = [
    {
        name: "app.js",
        path: "/src/app.js",
        entry: true,
        code: `import Vue from 'vue';
import App from './App.vue';

console.log(Vue);
console.log(App);

new Vue({
    el: '#app'
});`
    },
    {
        name: "App.vue",
        path: "/src/App.vue",
        code: `<template>
    <h1>Hello World!</h1>
</template>
<script>
export default { name: 'app' };
</script>`
    },
    {
        name: "Test.vue",
        path: "/src/Test.vue",
        code: `<template>
    <h1>Hello World!</h1>
</template>
<script>
export default { name: 'test' };
</script>`
    }
];

(async () => {
    try {
        console.time("First Load");
        const { code } = await pkger.bundle(files);
        eval(code);
        console.timeEnd("First Load");
        setTimeout(async () => {
            console.time("Second Load");
            const { code } = await pkger.bundle(files, {});
            eval(code);
            console.timeEnd("Second Load");
        }, 3000);
    } catch (e) {
        //
    }
})();
