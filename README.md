# Packager

## Installation

You can install Packager through CDN ([UNPKG](https://unpkg.com/packager), [JSDELIVR](https://cdn.jsdelivr.net/npm/packager)) or CLI:

```bash
yarn add packager
# or...
npm install packager
```

## Usage

```js
const packager = new Packager({
  sourcemaps: true
});

try {
  const { code } = await packager.bundle(files);
  console.log(code);
} catch (e) {
  //
}
```

## Examples

For examples on how to use Packager, visit the `examples` folder :)

## Documentation

[Packager Documentation](https://packager.baryla.dev)
