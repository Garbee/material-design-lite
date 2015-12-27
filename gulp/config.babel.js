export const BANNER = `
/**
 * <%= pkg.name %> - <%= pkg.description %>
 * @version v<%= pkg.version %>
 * @license <%= pkg.license %>
 * @copyright 2015 Google, Inc.
 * @link https://github.com/google/material-design-lite
 */
`;


export const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

export const SOURCES = [
  'src/drawer/drawer.babel.js',
  'src/snackbar/snackbar.babel.js',
  'src/textfield/textfield.babel.js'
];
