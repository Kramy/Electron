const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const minifyJs = require('gulp-minify');
const minifyCss = require('gulp-clean-css');
const minifyImg = require('gulp-imagemin');
const minifyHtml = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');

/**
 * 
 */
gulp.task('default', ['css', 'js', 'html'], () => {
    browserSync.init({
        server: './resources/views'
    });

    gulp.watch('resources/js/**/*.js', ['js']).on('change', browserSync.reload);
    gulp.watch('resources/sass/**/*.scss', ['css']).on('change', browserSync.reload);
    gulp.watch('./views/**/*.html').on('change', browserSync.reload);
    gulp.watch('views/**/*.html', ['html']).on('change', browserSync.reload);
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
    gulp.src('resources/sass/**/*.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
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