# PostCSS Understrap Palette Generator

[PostCSS] plugin to generate a json file of your Bootstrap color variables. This is a dependency for the [Understrap] open source WordPress theme framework. We're then digesting this JSON file to populate Gutenberg with theme colors that actually match your designs.

[PostCSS]: https://github.com/postcss/postcss

[Understrap]: https://github.com/understrap/understrap

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev https://github.com/bacoords/postcss-understrap-palette-generator
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
    autoprefixer : {}
+   'postcss-understrap-palette-generator':{},
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
