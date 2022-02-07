const fs = require( 'fs' );

module.exports = (opts = { }) => {

  // Work with options here

  return {
    postcssPlugin: 'postcss-understrap-palette-generator',
    prepare (result) {
      let colorJson = opts.defaults || {};
      let bs4 = opts.bs4 || true;
      let colorInfix = bs4 ? '' : 'bs-';
      let colors = opts.colors || [
        `--${colorInfix}blue`,
        `--${colorInfix}indigo`,
        `--${colorInfix}purple`,
        `--${colorInfix}pink`,
        `--${colorInfix}red`,
        `--${colorInfix}orange`,
        `--${colorInfix}yellow`,
        `--${colorInfix}green`,
        `--${colorInfix}teal`,
        `--${colorInfix}cyan`,
        `--${colorInfix}white`,
        `--${colorInfix}gray`,
        `--${colorInfix}gray-dark`
      ];

      return {
        Declaration (decl) {
          if ( colors.indexOf( decl.prop ) > -1 ) {
            colorJson[decl.prop] = decl.value;
          }
        },
        OnceExit () {
          if (!(Object.keys(colorJson).length === 0)){
            let fileInfix = bs4 ? '-bootstrap4' : '';
            fs.writeFile(`inc/editor-color-palette${fileInfix}.json`, JSON.stringify(colorJson), function(){});
          }
          return colorJson;
        }
      }
    }
  }
}
module.exports.postcss = true
