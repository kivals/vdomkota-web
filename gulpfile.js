import gulp from 'gulp';
import path from './gulp/config/path.js';
import plugins from "./gulp/config/plugins.js";

global.app = {
  isBuild: process.argv.includes('--production'),
  isDev: !process.argv.includes('--production'),
  path,
  gulp,
  plugins
};

import { copy } from "./gulp/tasks/copy.js";
import { clean } from "./gulp/tasks/clean.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { scripts } from "./gulp/tasks/scripts.js";
import { images } from "./gulp/tasks/images.js";
import { sprite } from "./gulp/tasks/sprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/tasks/fonts.js";

const watcher = () => {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, scripts);
  gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

const mainTasks = gulp.series(fonts,  gulp.parallel(copy, html, scss, scripts, images));

const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(clean, mainTasks);
const deployZip = gulp.series(clean, mainTasks, zip);

export {
  clean,
  html,
  scss,
  scripts,
  images,
  ttfToWoff,
  fontStyle,
  fonts,
  sprite,
  zip,
  dev,
  build,
  deployZip
}

gulp.task('default', dev);