import del from 'del'
import gulpZip from 'gulp-zip'

const zip = () => {
  del.sync(`./${app.path.pathBuild}.zip`)

  return app.gulp.src(`${app.path.pathBuild}/**/*.*`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'ZIP',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(gulpZip(`${app.path.root}.zip`))
    .pipe(app.gulp.dest('./'))
}

export { zip }