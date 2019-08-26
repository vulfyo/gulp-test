"use strict";

const gulp = require("gulp");
const plumber = require('gulp-plumber');
const concat = require("gulp-concat");
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const rename = require('gulp-rename');
//const tinypng = require('gulp-tinypng');


/* clean */
gulp.task('clean', function () {
    return del('assets/build/*');
});

/* scripts */
gulp.task('scripts', function () {
    return gulp.src('assets/js/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(uglify({toplevel: true}))
        .pipe(sourcemaps.write('maps'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/build/js'));
});

/* scripts with concat */
gulp.task('sripts-concat', async function () {
    return gulp.src(['assets/js/1.js', 'assets/js/2.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.min.js'))
        .pipe(uglify({toplevel: true}))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('assets/build/js'));
});

/* styles */
gulp.task('styles', function () {
    // return gulp.src('assets/scss/**/*.scss')
    return gulp.src(['assets/scss/**/*.scss', '!assets/scss/constants/*.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version, > 1%'))
        //.pipe(concat('bundle.css'))
        .pipe(cleanCSS({level: 2}))
        .pipe(sourcemaps.write('maps'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/build/css'));
});

/* images */
gulp.task('images', function () {
    return gulp.src('assets/img/*')
        .pipe(plumber())
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(
            cache(imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({plugins: [{removeViewBox: false, collapseGroups: true}]})
            ]))
        )
        .pipe(gulp.dest('assets/build/img'));
});

// gulp.task('tinypng', async function () {
//     return gulp.src('assets/img/*.png')
//         .pipe(tinypng('API_KEY'))
//         .pipe(gulp.dest('assets/build/img'));
// });

/* watch */
gulp.task('watch', function () {
    gulp.watch('assets/js/**/*.js', gulp.series('scripts'));
    gulp.watch('assets/scss/**/*.scss', gulp.series('styles'));
    // gulp.watch('assets/img/*', gulp.series('images'));
});

/* default */
gulp.task("default", gulp.series('clean', gulp.parallel('scripts', 'styles', 'images')));
