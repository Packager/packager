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

new Vue({
    el: '#app',
    render: h => h(App)
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
</script>
<style lang="scss" scoped>
@import "./app.scss";

h1 {
    color: red;
}
</style>`
    },
    {
        name: "app.scss",
        path: "/src/app.scss",
        code: `@import "./test";
$color: pink;
body {
    background: $color;
}`
    },
    {
        name: "test.scss",
        path: "/src/test.scss",
        code: `* {
    text-decoration: underline;
}`
    }
];

const files2 = [
    {
        name: "app.js",
        path: "/src/app.js",
        entry: true,
        code: `import Vue from 'vue';
import App2 from './App2.vue';

new Vue({
    el: '#app2',
    render: h => h(App2)
});`
    },
    {
        name: "App.vue",
        path: "/src/App2.vue",
        code: `<template>
    <h1>Hello World from App2.vue!</h1>
</template>
<script>
export default { 
    name: 'app',
    mounted () {
        console.log('log from mounted!');
    }
};
</script>`
    },
    {
        name: "App.vue",
        path: "/src/App3.vue",
        code: `<template>
    <h1>Hello World from App3.vue!</h1>
</template>
<script>
export default { name: 'app' };
</script>`
    },
    {
        name: "App.vue",
        path: "/src/App4.vue",
        code: `<template>
    <h1>Hello World from App4.vue!</h1>
</template>
<script>
export default { name: 'app' };
</script>`
    },
    {
        name: "App.vue",
        path: "/src/App5.vue",
        code: `<template>
    <h1>Hello World from App5.vue!</h1>
</template>
<script>
export default { name: 'app' };
</script>`
    }
];

(async () => {
    try {
        console.time("First Load");
        const { code } = await pkger.bundle(files);
        eval(code);
        console.timeEnd("First Load");

        // setTimeout(async () => {
        //     console.time("Second Load");
        //     const { code } = await pkger.bundle(files2);
        //     console.log(code);
        //     eval(code);
        //     console.timeEnd("Second Load");
        // }, 2000);
    } catch (e) {
        console.error(e);
    }
})();
