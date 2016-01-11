/**
 *
 *  Material Design Lite
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

import gulp from 'gulp';
import * as tasks from './gulp/tasks.babel';

import browserSync from 'browser-sync';
const reload = browserSync.reload;

gulp.task('clean', tasks.clean);

gulp.task('styles', gulp.parallel(
  tasks.mdlCss
  //tasks.mdlGridStyle
));

gulp.task('demos', gulp.parallel(
  tasks.mdlCss,
  tasks.mdlJs,
  tasks.demos
));

gulp.task('scripts', gulp.series(
  tasks.jslint,
  tasks.mdlJs
));

gulp.task('test', gulp.series(
  gulp.parallel('scripts')
));

gulp.task('closure', gulp.series(tasks.mdlClosureJs));

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('styles', 'scripts', tasks.images)
));

gulp.task('package', gulp.series(
  'clean',
  gulp.parallel(
    tasks.packageStyles,
    tasks.packageScripts,
    tasks.packageGridStyle,
    tasks.packageImages)
));

gulp.task('serve', () => {
  browserSync({
    notify: false,
    server: {
      baseDir: ['dist']
    }
  });
  gulp.watch(['demos/*'], gulp.series('demos', reload));
  gulp.watch(['src/**/*.js'], gulp.series('scripts', reload));
  gulp.watch(['src/**/*.css'], gulp.series('styles', reload));
  gulp.watch(['src/**/*.{svg,png,jpg}'], gulp.series(tasks.images, reload));
});
