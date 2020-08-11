let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

gulp.task('scss', function() {
    return gulp.src('assets/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/css')) 
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function(){
    gulp.watch('assets/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('assets/*.html', gulp.parallel('html'));
    gulp.watch('assets/js/*.js', gulp.parallel('script'));
});

gulp.task('html', function() {
    return gulp.src('assets/*.html')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('script', function() {
    return gulp.src('assets/js/*.js')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function(){
    return gulp.src([
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'assets/'
        }
    });
});

gulp.task('default', gulp.parallel('scss', 'js', 'browser-sync', 'watch'));