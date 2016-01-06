import pkg from '../package.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import * as config from './config.babel';
import through from 'through2';
import strip from 'gulp-strip-comments';
import bemLinter from 'postcss-bem-linter';


const $ = gulpLoadPlugins();

export function cssPipeline(stream, dest = 'dist') {
  return stream
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.cssInlineImages({webRoot: 'src'}))
    .pipe($.autoprefixer(config.AUTOPREFIXER_BROWSERS))
    .pipe($.postcss([
      bemLinter(
        'bem', {
        namespace: 'mdl'
      })
    ]))
    .pipe($.stripCssComments())
    .pipe($.header(config.BANNER, {pkg}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(dest));
}

export function jsPipeline(stream, dest = 'dist') {
  return stream
    .pipe($.sourcemaps.init())
    .pipe(strip())
    .pipe($.replace(new RegExp("export default (Material)([a-zA-Z]+);", "g"), ''))
    // Transpile with babel
    .pipe($.babel())
    // Clean up duplicate methods
    .pipe($.replace(config.BABEL.classCallCheck, ''))
    .pipe($.replace(config.BABEL.createClassFunction, ''))
    .pipe($.replace('\'use strict\';', ''))
    // Concatenate Scripts
    .pipe($.concat('material.js'))
    .pipe($.insert.prepend(config.BABEL.createClassFunction + '\n'))
    .pipe($.insert.prepend(config.BABEL.classCallCheck + '\n'))
    .pipe($.insert.prepend('\'use strict\';\n'))
    .pipe($.header(config.BANNER, {pkg}))
    // Write Source Maps
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(dest));
}

export const noop = through.obj.bind(through);

export function emptyStream() {
  const stream = through.obj();
  stream.end();
  return stream;
}
