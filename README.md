# Packager for Bloxy

## Installation

You can't really install Packager right now. You can copy the lib from `/examples/packager.js` or just clone this repo and run the build script but for now, there's no proper way to install it but... Some lovely peeps transferred the ownership of an NPM package called (drum roll please) ... Packager over to me so once I'm happy with the state of Packager, I'll release it on NPM 😘

## Usage

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

## Examples

For example on how to use Packager, visit the `examples` folder :)

## Documentation

WIP.
