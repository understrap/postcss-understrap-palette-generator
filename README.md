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

## Options

### defaults: object
Pass default values for variables that may or may not be in your Bootstrap's variables. They'll get added to the JSON file with the value you set. However, if they exist in your CSS and they're in the `colors` option below, they may get overwritten by the value in your CSS. Example:

```diff
module.exports = {
  plugins: [
    autoprefixer : {}
    'postcss-understrap-palette-generator':{
+     defaults: {
+       "--magenta": "#ff00ff"
+     }
    },
  ]
}
```

### colors: array
An array of color variables you explicitly want the tool to parse from your CSS file. The difference from `defaults` is that these are NOT added to the final output UNLESS a value is found in your CSS. Also, if you don't include a variable in this array, it does not get parsed by the tool at all.

```diff
module.exports = {
  plugins: [
    autoprefixer : {}
    'postcss-understrap-palette-generator':{
+     colors: [
+       "--primary"
+     ]
    },
  ]
}
```


[official docs]: https://github.com/postcss/postcss#usage
