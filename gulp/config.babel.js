export const BANNER = `
/*!
 * <%= pkg.name %> - <%= pkg.description %>
 * @version v<%= pkg.version %>
 * @license <%= pkg.license %>
 * @copyright 2015 Google, Inc.
 * @link https://github.com/google/material-design-lite
 */
`;

export const SOURCES = [
  'src/drawer/drawer.babel.js',
  'src/menu/menu.babel.js',
  'src/snackbar/snackbar.babel.js',
  'src/textfield/textfield.babel.js',
  'src/tooltip/tooltip.babel.js'
];

export const BABEL = {
  createClassFunction: 'var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();',
  classCallCheck: 'function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }'
};
