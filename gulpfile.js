const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

// Compile PUG → HTML
gulp.task('pug', function () {
  return gulp.src('src/pug/pages/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('public/html'));
});

// Compile SCSS → CSS
gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    // .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/css'));
});

// Watch file tự động build
gulp.task('watch', function () {
  gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
});

// Default
gulp.task('default', gulp.series('pug', 'sass', 'watch'));
