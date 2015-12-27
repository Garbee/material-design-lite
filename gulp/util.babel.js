import pkg from '../package.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import * as config from './config.babel';
import through from 'through2';

const $ = gulpLoadPlugins();

export function cssPipeline(stream) {
  return stream
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.cssInlineImages({webRoot: 'src'}))
    .pipe($.autoprefixer(config.AUTOPREFIXER_BROWSERS))
    .pipe($.stripCssComments())
    .pipe($.header(config.BANNER, {pkg}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
}

export const noop = through.obj.bind(through);

export function emptyStream() {
  const stream = through.obj();
  stream.end();
  return stream;
}
