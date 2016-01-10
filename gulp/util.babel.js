import pkg from '../package.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import * as config from './config.babel';
import through from 'through2';
import strip from 'gulp-strip-comments';
import bemLinter from 'postcss-bem-linter';
import cssImport from 'postcss-import';
import pxToRem from 'postcss-pxtorem';
import mixins from 'postcss-mixins';
import postCssReporter from 'postcss-reporter';
import cssNext from 'postcss-cssnext';
import simpleVars from 'postcss-simple-vars';
import customProperties from 'postcss-custom-properties';
import customMedia from 'postcss-custom-media';
import nesting from 'postcss-nesting';
import nano from 'gulp-cssnano';

const $ = gulpLoadPlugins();

export function cssPipeline(stream, dest = 'dist') {
  return stream
    .pipe($.sourcemaps.init())
    .pipe($.cssInlineImages({webRoot: 'src'}))
    .pipe($.postcss([
      cssImport,
      simpleVars,
      customProperties,
      customMedia,
      nesting,
      cssNext,
      mixins,
      pxToRem({
        rootValue: 16,
        unitPrecision: 8,
        replace: true,
        mediaQuery: false,
        propWhiteList: []
      }),
      postCssReporter({
        clearMessages: true
      })
    ]))
      .pipe($.postcss([
        bemLinter({
          preset: 'bem',
          presetOptions: {
            namespace: 'mdl'
          },
          componentName: /[a-z -]/,
          ignoreSelectors: [
            new RegExp('\.material-icons'),
            /\*/,
            /fieldset\[disabled\]/
          ]
        }),
        postCssReporter({
          clearMessages: true
        })
      ]))
    .pipe(gulp.dest(dest))
    .pipe(nano({
      autoprefixer: false,
      colormin: true,
      convertValues: {
        length: false,
        time: true,
        angle: false
      },
      discardComments: {
        removeAll: true
      },
      discardDuplicates: true,
      discardEmpty: true,
      discardUnused: {
        keyframes: true,
        fontFace: true,
        counterStyle: true
      },
      mergeIdents: true,
      mergeLonghand: true,
      mergeRules: true,
      minifyFontValues: {
        removeAfterKeyword: true,
        removeDuplicates: true,
        removeQuotes: false
      },
      minifyGradients: true,
      minifySelectors: true,
      normalizeCharset: {
        add: true
      },
      orderedValues: true,
      reduceIndents: {
        counter: false,
        keyframes: false,
        counterStyle: false
      },
      reduceTransforms: true,
      uniqueSelectors: true,
      zindex: false
    }))
    .pipe($.rename({extname: '.min.css'}))
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
