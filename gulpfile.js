const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const minifyJs = require('gulp-minify');
const minifyCss = require('gulp-clean-css');
const minifyImg = require('gulp-imagemin');

/**
 * Task that execute a local web server precompiling scss files.
 */
gulp.task('serve', ['sass'], () => {
    browserSync.init({
        server: './views',
        localOnly: true,
        files: './views'
    });

    gulp.watch('resources/js/*.js', ['minifyJs']);
    // gulp.watch('resources/js/*.js', ['minifyCss']);
    gulp.watch('resources/sass/**/*.scss', ['sass']);
    gulp.watch('./views/*.html').on('change', browserSync.reload);
});

/**
 * Task that minify js files.
 */
gulp.task('minifyJs', () => {
    gulp.src('resources/js/*.js')
      .pipe(minifyJs({
          ext: {
              src: '.js',
              min: '.min.js'
          }
      }))
      .pipe(gulp.dest('resources/js/min'));
  });

/**
 * Task that precompile and minify scss files.
 */
gulp.task('sass', () => {
    gulp.src('resources/sass/**/*.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('resources/css'))
        .pipe(browserSync.stream());
});

/**
 * Task that minify png, jpg, gif and svg files.
 */
gulp.task('minifyImg', () => {
    gulp.src('resources/img/*')
    .pipe(minifyImg())
    .pipe(gulp.dest('resources/img/min'));
});