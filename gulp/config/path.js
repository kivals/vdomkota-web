import path from 'path';

const pathSrc = './src';
const pathBuild = './build';
const root = path.basename(path.resolve());

export default {
  src: {
    html: `${pathSrc}/html/**/*.html`,
    files: `${pathSrc}/files/**/*.*`,
    scss: `${pathSrc}/scss/**/*.scss`,
    js: `${pathSrc}/js/app.js`,
    images: `${pathSrc}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${pathSrc}/img/**/*.svg`,
    svgicons: `${pathSrc}/svgicons/*.svg`,
  },

  build: {
    html: `${pathBuild}/`,
    files: `${pathBuild}/files/`,
    css: `${pathBuild}/css/`,
    js: `${pathBuild}/js/`,
    images: `${pathBuild}/img/`,
    fonts: `${pathBuild}/fonts/`,
  },

  watch: {
    html: `${pathSrc}/**/*.html`,
    files: `${pathSrc}/files/**/*.*`,
    scss: `${pathSrc}/scss/**/*.scss`,
    js: `${pathSrc}/js/**/*.js`,
    images: `${pathSrc}/img/**/*.{jpg,jpeg,png,svg,gif,webp}`,
  },

  clean: pathBuild,
  pathSrc,
  pathBuild,
  root
}
