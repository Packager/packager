const packager = new Packager();
packager.registerPlugin(commonjsPlugin);
packager.registerPlugin(vuePlugin);
packager.registerPlugin(sassPlugin);
packager.registerPlugin(cssPlugin);

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
<style lang="scss">
h1 {
  text-decoration: underline;
}
</style>
<style>
h1 {
  color: red;
}
</style>`
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
