const fs = require('fs');

module.exports = (opts = {}) => {

  // Work with options here
  let themeJson = {
      "$schema": "https://schemas.wp.org/trunk/theme.json",
      "version": 1,
      "styles": {
          "border": {
              "radius": "value"
          },
          "color": {
              "background": "value",
              "gradient": "value",
              "text": "value",
              "palette": [],
          },
          "spacing": {
              "margin": {
                  "top": "value",
                  "right": "value",
                  "bottom": "value",
                  "left": "value"
              },
              "padding": {
                  "top": "value",
                  "right": "value",
                  "bottom": "value",
                  "left": "value"
              }
          },
          "typography": {
              "fontSize": "value",
              "lineHeight": "value",
              "fontFamilies": []
          },
          "elements": {
              "link": {
                  "border": {},
                  "color": {},
                  "spacing": {},
                  "typography": {}
              },
              "h1": {
                  "typography": {}
              },
              "h2": {
                  "typography": {}
              },
              "h3": {
                  "typography": {}
              },
              "h4": {
                  "typography": {}
              },
              "h5": {
                  "typography": {}
              },
              "h6": {
                  "typography": {}
              }
          },
      }
  };
  return {
    postcssPlugin: 'postcss-understrap-palette-generator',
    prepare(result) {
      let colorJson = opts.defaults || {};
      let colors = opts.colors || [
        "--blue",
        "--indigo",
        "--purple",
        "--pink",
        "--red",
        "--orange",
        "--yellow",
        "--green",
        "--teal",
        "--cyan",
        "--white",
        "--gray",
        "--gray-dark"
      ];
      return {
        Declaration(decl) {
          if (colors.indexOf(decl.prop) > -1) {
            let slug = decl.prop.replace('--bs-', '').replace('--','');
            themeJson.styles.color.palette.push(
              {
                'slug':slug,
                'color':decl.value,
                'name':slug
              }
            );
          }
          switch( decl.prop ) {
            case '--bs-body-font-size':
              themeJson.styles.typography.fontSize = decl.value;
              break;
            case '--bs-body-line-height':
              themeJson.styles.typography.lineHeight = decl.value;
              break;
            case '--bs-body-bg':
              themeJson.styles.color.background = decl.value;
              break;
            case '--bs-body-color':
              themeJson.styles.color.text = decl.value;
              break;
            case '--understrap-border-radius':
              themeJson.styles.border.radius = decl.value;
              break;
            case '--understrap-link-color':
              themeJson.styles.elements.link.color = decl.value;
              break;
            case '--understrap-spacer':
              themeJson.styles.spacing.margin.bottom = decl.value;
              themeJson.styles.spacing.margin.top = decl.value;
              themeJson.styles.spacing.margin.left = decl.value;
              themeJson.styles.spacing.margin.right = decl.value;
              break;
            case '--bs-font-sans-serif':
              themeJson.styles.typography.fontFamilies.push({
                'fontFamily':decl.value,
                'slug':'sans-serif',
                'name':'sans-serif'
              });
              break;
            case '--bs-font-monospace':
              themeJson.styles.typography.fontFamilies.push({
                'fontFamily':decl.value,
                'slug':'monospace',
                'name':'monospace'
              });
              break;
            case '--understrap-fs1':
              themeJson.styles.elements.h1.typography.fontSize = decl.value;
              break;
            case '--understrap-fs2':
              themeJson.styles.elements.h2.typography.fontSize = decl.value;
              break;
            case '--understrap-fs3':
              themeJson.styles.elements.h3.typography.fontSize = decl.value;
              break;
            case '--understrap-fs4':
              themeJson.styles.elements.h4.typography.fontSize = decl.value;
              break;
            case '--understrap-fs5':
              themeJson.styles.elements.h5.typography.fontSize = decl.value;
              break;
            case '--understrap-fs6':
              themeJson.styles.elements.h6.typography.fontSize = decl.value;
              break;
          }
        },
        OnceExit() {
          if (!(Object.keys(themeJson).length === 0)) {
            fs.writeFile('theme.json', JSON.stringify(themeJson), function () { });
          }
          return themeJson;
        }
      }
    }
  }
}
module.exports.postcss = true
