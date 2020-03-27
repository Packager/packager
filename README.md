# Packager

Packager is a browser-based trans-bundler with a nice plugin API and is capable of transpiling any file (if you have the right plugins of course ;p).

## Installation

You can install Packager through CDN ([UNPKG](https://unpkg.com/packager), [JSDELIVR](https://cdn.jsdelivr.net/npm/packager)) or CLI:

```bash
yarn add packager
# or...
npm install packager
```

> CDN is the preferred way because Packager was built to be directly injected to the page in a script tag.

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

## Contributions

I would love to find some contributors so if you want to contribute to Packager, feel free to do so.

This monorepo uses _yarn workspaces_ so head over to their docs to see how to use it but in most cases, the scripts in the root `package.json` cover most of the scenarios.

You can do `yarn dev` inside all of packages and you can preview your changes in the examples from the `examples` folder.

> I usually open one of the examples using Live Server which has instant reloads. All of the examples point to the builds of the packages for quick development.

If you have any questions, you can DM me on [twitter](https://twitter.com/AdrianBarylski) :)

## Documentation

[Packager Documentation](https://packager.baryla.dev)
