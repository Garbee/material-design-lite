import pkg from '../package.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();
import * as config from './config.babel';
import * as util from './util.babel';
import del from 'del';
import path from 'path';
import fs from 'fs';
import strip from 'gulp-strip-comments';

// Lint JavaScript
export function jslint() {
  return gulp.src(config.SOURCES)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
}

// Optimize Images
// TODO: Update image paths in final CSS to match root/images
export function images() {
  return gulp.src('src/**/*.{svg,png,jpg}')
    .pipe($.flatten())
    .pipe(gulp.dest('dist/images'));
}

// Compile and Automatically Prefix Stylesheets (production)
export function mdlCss() {
  const stream = gulp.src('src/material-design-lite.scss')
    .pipe($.rename('material.css'));

  return util.cssPipeline(stream);
}

// Compile and Automatically Prefix Stylesheets (production)
export function mdlThemeTemplate() {
  const stream = gulp.src('src/template.scss')
    .pipe($.rename('material.template.css'));

  return util.cssPipeline(stream);
}

// Build with Google's Closure Compiler, requires Java 1.7+ installed.
export function mdlClosureJs() {
  return gulp.src(config.SOURCES)
    .pipe($.closureCompiler({
      compilerPath: 'node_modules/google-closure-compiler/compiler.jar',
      fileName: 'material.closure.min.js',
      compilerFlags: {
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        language_in: 'ECMASCRIPT6_STRICT',
        language_out: 'ECMASCRIPT5_STRICT',
        warning_level: 'VERBOSE'
      }
    }))
    .pipe(gulp.dest('./dist'));
}

// Concatenate And Minify JavaScript
export function mdlJs() {
  return gulp.src(config.SOURCES)
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
    .pipe(gulp.dest('dist'))
    // Write Source Maps
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
}

// Copy package manger and LICENSE files to dist
export function metadata() {
  return gulp.src([
      'package.json',
      'bower.json',
      'LICENSE'
    ])
    .pipe(gulp.dest('dist'));
}

export function mocha() {
  return gulp.src('test/index.html')
    .pipe($.mochaPhantomjs({reporter: 'tap'}));
}

export function mochaClosure() {
  return gulp.src('test/index.html')
    .pipe($.replace('src="../dist/material.js"',
      'src="../dist/material.closure.min.js"'))
    .pipe($.rename('temp.html'))
    .pipe(gulp.dest('test'))
    .pipe($.mochaPhantomjs({reporter: 'tap'}))
    .on('finish', () => del.sync('test/temp.html'))
    .on('error', () => del.sync('test/temp.html'));
}
