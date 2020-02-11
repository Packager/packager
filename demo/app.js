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

import './styles/app.css';

new Vue({
    el: '#app',
    render: h => h(App)
});`
    },
    {
        name: "index.js",
        path: "/src/index.js",
        code: `console.log('new main!');`
    },
    {
        name: "App.vue",
        path: "/src/App.vue",
        code: `<template>
    <h1 class="heading">Hello World!</h1>
</template>
<script>
export default { name: 'app' };
</script>`
    },
    {
        name: "app.css",
        path: "/src/styles/app.css",
        code: `@import "./test.css";
* {
    margin: 0;
}

body { 
    background: red; 
}

@media screen and (max-width: 480px) {
    body {
        background: black !important;
    }
}`
    },
    {
        name: "test.css",
        path: "/src/styles/test.css",
        code: `@import "./another.css";
* {
    padding: 0;
}

h1 {
    color: white;
}`
    },
    {
        name: "another.css",
        path: "/src/styles/another.css",
        code: `* { color: pink !important; }`
    }
];

const reactFiles = [
    {
        name: "app.js",
        path: "/src/app.js",
        code: `import React, { Component } from 'react';
import random from './random';

console.log(Component);
console.log(random);
console.log(<h1>Hello!</h1>);`,
        entry: true
    },
    {
        name: "random.js",
        path: "/src/random.js",
        code: `import React from 'react';

export default React;`
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

const ionicTest = [
    {
        name: "app.js",
        path: "/src/app.js",
        entry: true,
        code: `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <App />,
    document.getElementById('app')
);`
    },
    {
        name: "App.tsx",
        path: "/src/App.tsx",
        code: `import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
    <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
    </IonReactRouter>
    </IonApp>
);

export default App;`
    },
    {
        name: "Home.tsx",
        path: "/src/pages/Home.tsx",
        code: `import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Home: React.FC = () => {
    return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        The world is your oyster.
        <p>
            If you get lost, the{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/">
            docs
            </a>{' '}
            will be your guide.
        </p>
        </IonContent>
    </IonPage>
    );
};

export default Home;`
    }
];

(async () => {
    try {
        console.time("First Load");
        const { code } = await pkger.bundle(files);
        eval(code);
        console.timeEnd("First Load");

        // console.time("First Load");
        // const { code } = await pkger.bundle(reactFiles);
        // eval(code);
        // console.timeEnd("First Load");

        // setTimeout(async () => {
        //     console.time("Second Load");
        //     const { code } = await pkger.bundle(files2);
        //     eval(code);
        //     console.timeEnd("Second Load");
        // }, 2000);
    } catch (e) {
        console.error(e);
    }
})();
