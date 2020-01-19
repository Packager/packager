// const pkger = new Packager({
//     sourcemaps: true
// });

// const files = [
//     {
//         name: "app.js",
//         path: "/src/app.js",
//         entry: true,
//         code: `import React from 'react';
// import test from './test.js'

// console.log(React);`
//     },
//     {
//         name: "test.js",
//         path: "/src/test.js",
//         code: `export default function () {
//     return 'test!';
// }`
//     }
// ];

(async () => {
    // try {
    //     console.time("First Load");
    //     const { code } = await pkger.bundle(files, {});
    //     eval(code);
    //     console.timeEnd("First Load");
    //     setTimeout(async () => {
    //         console.time("Second Load");
    //         const { code } = await pkger.bundle(files, {});
    //         eval(code);
    //         console.timeEnd("Second Load");
    //     }, 3000);
    // } catch (e) {
    //     //
    // }
})();
