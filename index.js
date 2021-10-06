const fs = require( 'fs' );

module.exports = (opts = { }) => {

  // Work with options here

  return {
    postcssPlugin: 'postcss-understrap-palette-generator',
	prepare (result) {
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
			Declaration (decl) {
				if ( colors.indexOf( decl.prop ) > -1 ) {
					colorJson[decl.prop] = decl.value;
				}
			},
			OnceExit () {
        if (!(Object.keys(colorJson).length === 0)){
          fs.writeFile('inc/editor-color-palette.json', JSON.stringify(colorJson), function(){});
        }
				return colorJson;
			}
		}
	}
  }
}
module.exports.postcss = true
