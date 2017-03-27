/**
 * Define all of the node_modules to include
 */

exports.entitas = require('./entitas')

/**
 * Use browserify to bundle the node modules:
 * 
 * browserify --standalone bundle src/js/exports.js -o src/js/bundle.js
 */
