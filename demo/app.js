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
        code: `import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock';
import random from './random';

console.log(Component);
console.log(random);

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
    },
    {
        name: "random.js",
        path: "/src/random.js",
        code: `import react from 'react';

export default react;`
    }
];

const svelteTest = [
    {
        name: "app.js",
        path: "/src/app.js",
        entry: true,
        code: `import SvelteApp from './App.svelte';

new SvelteApp({
    target: document.getElementById('app')
});`
    },
    {
        name: "App.svelte",
        path: "/src/App.svelte",
        code: `<script>
import { time, elapsed } from './stores.js';

const formatter = new Intl.DateTimeFormat('en', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
});
</script>

<h1>The time is {formatter.format($time)}</h1>

<p>
This page has been open for
{$elapsed} {$elapsed === 1 ? 'second' : 'seconds'}
</p>`
    },
    {
        name: "stores.js",
        path: "/src/stores.js",
        code: `import { readable, derived } from 'svelte/store';

export const time = readable(new Date(), function start(set) {
    const interval = setInterval(() => {
        set(new Date());
    }, 1000);

    return function stop() {
        clearInterval(interval);
    };
});

const start = new Date();

export const elapsed = derived(
    time,
    $time => Math.round(($time - start) / 1000)
);`
    }
];
(async () => {
    try {
        console.time("First Load");
        const { code } = await pkger.bundle(svelteTest);
        eval(code);
        console.timeEnd("First Load");

        // console.time("First Load");
        // const { code } = await pkger.bundle(reactFiles);
        // eval(code);
        // console.timeEnd("First Load");

        // setTimeout(async () => {
        //     console.time("Second Load");
        //     const { code } = await pkger.bundle(svelteTest);
        //     eval(code);
        //     console.timeEnd("Second Load");
        // }, 2000);
    } catch (e) {
        console.error(e);
    }
})();
