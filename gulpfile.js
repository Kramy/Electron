const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyJs = require('gulp-minify');
const minifyCss = require('gulp-clean-css');
const minifyImg = require('gulp-imagemin');
const minifyHtml = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const electron = require('electron-connect').server.create();

/**
 * 
 */
gulp.task('default', ['css', 'js', 'html'], () => {

    electron.start();

    gulp.watch('resources/js/**/*.js', ['js', electron.restart]);
    gulp.watch('resources/sass/**/*.scss', ['css', electron.restart]);
    gulp.watch('resources/views/**/*.html', ['html', electron.restart]);
});

/**
 * Task that minify js files.
 */
gulp.task('js', () => {
    gulp.src('resources/js/**/*.js')
        .pipe(minifyJs({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('dist/js'));
  });

/**
 * Task that precompile and minify scss files.
 */
gulp.task('css', () => {
    gulp.src('resources/sass/*.scss')
        .pipe(sass.sync())
        .pipe(minifyCss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
});

/**
 * Task that minify png, jpg, gif and svg files.
 */
gulp.task('img', () => {
    gulp.src('resources/img/*')
        .pipe(minifyImg())
        .pipe(gulp.dest('dist/img'));
});

/**
 * Task that minify hmlt files.
 */
gulp.task('html', () => {
    gulp.src('resources/views/**/*.html')
        .pipe(minifyHtml({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/views'));
});