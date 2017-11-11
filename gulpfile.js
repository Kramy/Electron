const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

/**
 * Task that execute a local web server precompiling scss files.
 */
gulp.task('serve', ['sass'], () => {
    browserSync.init({
        server: './views',
        localOnly: true,
        files: './views'
    });

    gulp.watch('resources/sass/**/*.scss', ['sass']);
    gulp.watch('./views/*.html').on('change', browserSync.reload);
})

/**
 * Task that precompile modified scss files.
 */
gulp.task('sass', () => {
    return gulp.src('resources/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('resources/css'))
        .pipe(browserSync.stream());
});