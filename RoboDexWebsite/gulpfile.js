/// <binding BeforeBuild='default' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('default', function () {
    gulp.start("sass");
    gulp.start("js");
});

gulp.task("sass", function () {
    return gulp.src('./Styles/scss/main.scss')
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./Styles/css/'));
});

gulp.task("js", function () {
    return gulp.src(['./Scripts/custom/custom.js', './Scripts/bootstrap.bundle.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./Scripts/custom/'));
});