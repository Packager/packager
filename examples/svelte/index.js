const packager = new Packager();

const files = [
    {
        name: "app.js",
        path: "/src/app.js",
        entry: true,
        code: `import SvelteApp from './App.svelte';
        
new SvelteApp({
    target: document.getElementById('app')
})`
    },
    {
        name: "App.svelte",
        path: "/src/App.svelte",
        code: `<script>
    let count = 0;

    function handleClick() {
        count += 1;
    }
</script>

<h1>Hello World!</h1>
<button on:click={handleClick}>
    Clicked {count} {count === 1 ? 'time' : 'times'}
</button>`
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
