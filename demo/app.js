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

import './test.less';

new Vue({
    el: '#app',
    render: h => h(App)
});`
    },
    {
        name: "App.vue",
        path: "/src/App.vue",
        code: `<template>
    <h1 class="heading">Hello World!</h1>
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
        code: `$color: pink;
body {
    background: $color;
}`
    },
    {
        name: "test.less",
        path: "/src/test.less",
        code: `@my-selector: heading;

.@{my-selector} {
    font-weight: bold;
    text-decoration: underline;
}`
    }
];

const reactFiles = [
    {
        name: "app.js",
        path: "/src/app.js",
        code: `import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock';

ReactDOM.render(
    <Clock />,
    document.getElementById('app')
);
`,
        entry: true
    },
    {
        name: "Clock.js",
        path: "/src/Clock.js",
        code: `import React from 'react';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}`
    }
];

(async () => {
    try {
        console.time("First Load");
        const { code } = await pkger.bundle(reactFiles);
        eval(code);
        console.timeEnd("First Load");
    } catch (e) {
        console.error(e);
    }
})();
