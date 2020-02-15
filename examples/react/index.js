const packager = new Packager();

const files = [
    {
        name: "app.js",
        path: "/src/app.js",
        entry: true,
        code: `import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <App />,
    document.getElementById('app')
);`
    },
    {
        name: "App.jsx",
        path: "/src/App.jsx",
        code: `import React from 'react';

export default () => (<h1>Hello World!</h1>);`
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
