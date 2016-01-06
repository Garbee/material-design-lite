import pkg from '../package.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();
import * as config from './config.babel';
import * as util from './util.babel';
import del from 'del';
import path from 'path';
import fs from 'fs';

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

export function mdlCss() {
  const stream = gulp.src('src/material-design-lite.scss')
    .pipe($.rename('material.css'));

  return util.cssPipeline(stream);
}

export function mdlJs() {
  let stream = gulp.src(config.SOURCES);
  return util.jsPipeline(stream, 'dist');
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

export function packageScripts() {
  let stream = gulp.src(config.SOURCES);
  return util.jsPipeline(stream, 'mdl');
}

export function packageStyles() {
  const stream = gulp.src('src/material-design-lite.scss')
    .pipe($.rename('material.css'));

  return util.cssPipeline(stream, 'mdl');
}

// TODO: Update image paths in final CSS to match root/images
export function packageImages() {
  return gulp.src('src/**/*.{svg,png,jpg}')
    .pipe($.flatten())
    .pipe(gulp.dest('mdl/images'));
}

export function mocha() {
  return gulp.src('test/index.html')
    .pipe($.mochaPhantomjs({reporter: 'tap'}));
}

export function clean() {
  return del([
    'dist',
    'mdl'
  ]);
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
