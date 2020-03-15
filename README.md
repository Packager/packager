# Packager for Bloxy

## Installation

You can install Packager through CDN ([UNPKG](https://unpkg.com/packager), [JSDELIVR](https://cdn.jsdelivr.net/npm/packager)) or CLI:

```bash
yarn add packager
# or...
npm install packager
```

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

For more information, head over to the docs section.
