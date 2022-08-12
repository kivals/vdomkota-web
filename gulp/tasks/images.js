import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import webp from 'gulp-webp';

const images = () => {
  return app.gulp.src(app.path.src.images)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'IMAGES',
        message: 'Error: <%= error.message %>'
      })
    ))
    // .pipe(newer(app.path.build.images))
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.images))
    .pipe(newer(app.path.build.images))
    .pipe(app.plugins.ifPlugin(app.isBuild, imagemin({
      verbose: true,  // вывод информации о размере для каждого изображения
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 4 // 0 to 7
    })))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browserSync.stream());
}

export { images }
