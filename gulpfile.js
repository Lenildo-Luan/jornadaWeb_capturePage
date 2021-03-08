const gulp = require('gulp');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');

const config = {
    baseDir: 'src',
    destDit: 'public',
    htmlDir: 'src/**/*.html',
    cssDir: 'src/styles/**/*.css',
    jsDir: 'src/scripts/**/*.js'
}

gulp.task('server', () => {
    // Init locar server
    browserSync.init({
        server: {
            baseDir: config.baseDir
        },
    })

    // Reloads the browser whenever HTML, CSS or JS files change
    gulp.watch([config.htmlDir, config.cssDir, config.jsDir], (cb) => {
        browserSync.reload();
        cb();
    });
});

gulp.task('js:build', () => {
    return gulp.src('src/**/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest(config.destDit))
});

gulp.task('css:build', () => {
    return gulp.src('src/**/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', autoprefixer()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest(config.destDit))
});

gulp.task('images:build', () => {
    return gulp.src('src/assets/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(config.destDit + '/assets'))
});

gulp.task('clean:dist', () => {
    return del.sync(config.destDit);
})

gulp.task('cache:clear', () => {
    return cache.clearAll()
})

gulp.task('build', () => {
    return gulp.src('src/**/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.html', htmlmin({ collapseWhitespace: true })))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', autoprefixer()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest(config.destDit))
});

gulp.task('fonts', function() {
    return gulp.src('./assets/fonts/**/*')
        .pipe(gulp.dest(config.destDit + '/assets' + '/fonts'))
})