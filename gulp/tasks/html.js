import fileInclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import webpHtml from 'gulp-webp-html';
import versionNumber from 'gulp-version-number'

const html = () => {
  return app.gulp.src(app.path.src.html)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(fileInclude())
    .pipe(webpHtml())
    .pipe(app.plugins.size({
      title: "До сжатия"
    }))
    .pipe(app.plugins.ifPlugin(app.isBuild, htmlmin({
        collapseWhitespace: true,
      }
    )))
    .pipe(app.plugins.size({
      title: "После сжатия"
    }))
    .pipe(app.plugins.ifPlugin(app.isBuild, versionNumber({
      'value': '%DT%',
      'append': {
        'key': '_v',
        'cover': 0,
        'to': [
          'css',
          'js',
        ],
      },
      'output': {
        'file': 'gulp/version.json'
      },
    })))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
}

export {
  html
}
