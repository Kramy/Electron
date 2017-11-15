const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyJs = require('gulp-minify');
const minifyCss = require('gulp-clean-css');
const minifyImg = require('gulp-imagemin');
const minifyHtml = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const electronServer = require('electron-connect').server.create({
    stopOnClose: true
});

/**
 * 
 */
gulp.task('default', ['compilers', 'watchers'], () => {
    electronServer.start((state) => {
        if (state == 'stopped') {
            process.exit();
        }
    });
});

/**
 * Task that runs every watcher.
 */
gulp.task('watchers', () => {
    gulp.watch('./src/js/**/*.js', ['compile:js', electronServer.restart]);
    gulp.watch('./src/sass/**/*.scss', ['compile:css', electronServer.restart]);
    gulp.watch('./src/views/**/*.html', ['compile:html', electronServer.restart]);
});

/**
 * Task that runs every compiler.
 */
gulp.task('compilers', ['compile:css', 'compile:js', 'compile:html']);

/**
 * Task that minify js files.
 */
gulp.task('compile:js', () => {
    gulp.src('./src/js/**/*.js')
        .pipe(minifyJs({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('./dist/js'));
  });

/**
 * Task that precompile and minify scss files.
 */
gulp.task('compile:css', () => {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        // .pipe(sass({
        //     includePaths: [
        //         './src/sass/abstracts'
        //     ]
        // }).on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'));
});

/**
 * Task that minify png, jpg, gif and svg files.
 */
gulp.task('compile:img', () => {
    gulp.src('./src/img/*')
        .pipe(minifyImg())
        .pipe(gulp.dest('./dist/img'));
});

/**
 * Task that minify hmlt files.
 */
gulp.task('compile:html', () => {
    gulp.src('./src/views/**/*.html')
        .pipe(minifyHtml({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./dist/views'));
});