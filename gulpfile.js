
const{src,dest,watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps= require('gulp-sourcemaps');
const cssnano = require('cssnano')

const imagemin = require('gulp-imagemin');
const webpVersion = require('gulp-webp');
const avifVersion = require('gulp-avif');

function css ( done ){
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss( [ autoprefixer(), cssnano()] ) )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
  
      done();
  }
  function imagenes (){

    return src('src/img/**/*')
           .pipe(imagemin({optimizationLevel: 3}))
           .pipe(dest('build/img'))
  }
  function webp (){
      const opciones = {
        quality:50
      }
    return src('src/img/**/*.{png,jpg}')
              .pipe(webpVersion(opciones))
              .pipe(dest('build/img'))
  }
  function avif (){
    const opciones = {
        quality:50
      }
    return src('src/img/**/*.{png,jpg}')
              .pipe(avifVersion(opciones))
              .pipe(dest('build/img'))
  }
  function dev (){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
  }
  
  exports.css = css;
  exports.dev = dev;
  exports.imagenes = imagenes;
  exports.webp  = webp ;
  exports.avif  = avif ;
  exports.default = series(imagenes,webp,avif,css,dev);