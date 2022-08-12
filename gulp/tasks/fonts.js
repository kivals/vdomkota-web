import fs from 'fs';
import path from "path";
import fonter from 'gulp-fonter';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

const otfToTtf = () => {
  // Ищем файлы шрифтов .otf
  return app.gulp.src(`${app.path.pathSrc}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>'
      })
    ))
    // Конвертируем в .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))
    // Выгружаем в исходную папку
    .pipe(app.gulp.dest(`${app.path.pathSrc}/fonts/`))
}

const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return app.gulp.src(`${app.path.pathSrc}/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>'
      })
    ))
    // Конвертируем в .woff
    .pipe(ttf2woff())
/*    .pipe(fonter({
      formats: ['woff']
    }))*/
    // выгружаем в папку с результатом
    .pipe(app.gulp.dest(app.path.build.fonts))
    // ищем файлы шрифтов .ttf
    .pipe(app.gulp.src(`${app.path.pathSrc}/fonts/*.ttf`))
    // конвертируем в .woff2
    .pipe(ttf2woff2())
    // выгружаем в папку с результатом
    .pipe(app.gulp.dest(app.path.build.fonts))
    // Ищем файлы шрифтов .woff и woff2
    .pipe(app.gulp.src(`${app.path.pathSrc}/fonts/*.{woff,woff2}`))
    // Выгружаем в папку с результатом
    .pipe(app.gulp.dest(app.path.build.fonts))
}

const fontStyle = () => {
  // Словарь возможных вариаций шрифта
  const fontDictionary = {
    THIN: 100,
    EXTRALIGHT: 200,
    LIGHT: 300,
    REGULAR: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700,
    EXTRABOLD: 800,
    HEAVY: 800,
    BLACK: 900,
  }

  // Путь файла стилей подключения шрифтов
  const fontStyle = `${app.path.pathSrc}/scss/config/_fonts.scss`;

  // Проверяем существует ли файл стилей для подключения шрифтов
  if (fs.existsSync(fontStyle)) {
    console.log(`Файл ${fontStyle} уже существует. Для обновления файла нужно его удалить!`);
    return app.gulp.src(app.path.pathSrc);
  }

  // получаем уникальный набор шрифтов
  const fontFiles = fs.readdirSync(app.path.build.fonts).reduce((res, fontFile) => {
    // Имя файла без разрешения
    const fileNoExt = path.parse(fontFile).name;

    let fontWeightName = fileNoExt.split('-')[1]?.toUpperCase();
    const fontName = fileNoExt.split('-')[0] || fileNoExt;
    const fontWeight = fontDictionary[fontWeightName] || 400;

    res[fileNoExt] = {
      fontName,
      fontWeight,
    }
    return res;
  }, {})

  // формируем файл стилей для полученных шрифтов
  Object.keys(fontFiles).forEach(font => {
    fs.appendFileSync(fontStyle,
`@font-face {
          font-family: ${fontFiles[font].fontName};
          font-display: swap;
          src: url("../fonts/${font}.woff2") format("woff2"), url("../fonts/${font}.woff") format("woff");
          font-weight: ${fontFiles[font].fontWeight};
          font-style: normal;
        }\r\n`)
  })

  return app.gulp.src(`${app.path.pathSrc}`)
}

export {
  otfToTtf,
  ttfToWoff,
  fontStyle,
}
