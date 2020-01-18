# Packager for Bloxy

```js
const pkger = new Packager({
    sourcemaps: true
});

try {
    const { code } = await pkger.bundle(files);
    console.log(code);
} catch (e) {
    //
}
```

## Available options

#### Sourcemaps | sourcemaps (Boolean) | Constructor

Self-explanatory but it will essentially inline the sourcemap to the bundle.
This can greatly increase the size of the generated bundle so use with caution.

#### External Modules | externalModules (Object) | Bundle function

Packager uses this for figuring out which version of an NPM module to fetch & use in the bundle.
The keys of the object are the module names and the value is the version.

Example:

```js
const files = [
    {
        name: "app.js",
        path: "/src/app.js",
        entry: true,
        code: `import Vue from 'vue';`
    }
];

const bundleOptions = {
    externalModules: {
        vue: "2.6.10"
    }
};

const pkger = new Packager();
pkger.bundle(files, bundleOptions);
```

If we use an external module in the code but don't specify it in `externalModules`, Packager will use `latest` as the version.
