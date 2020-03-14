const packager = new Packager();
packager.registerPlugin(commonjsPlugin);
packager.registerPlugin(vuePlugin);
packager.registerPlugin(sassPlugin);

const files = [
    {
        name: "app.js",
        path: "/src/app.js",
        entry: true,
        code: `import Vue from 'vue';
import App from './App.vue';

new Vue({
    el: '#app',
    render: h => h(App)
});`
    },
    {
        name: "App.vue",
        path: "/src/App.vue",
        code: `<template>
    <h1>Hello world from Vue!</h1>
</template>
<script>
export default { name: 'app' };
</script>
<script lang="scss>
h1 {
    text-decoration: underline;
}
</script>`
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
