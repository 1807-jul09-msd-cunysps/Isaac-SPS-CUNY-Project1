/// <binding BeforeBuild='default' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('default', function () {
    gulp.start("css");
    gulp.start("js");
});

gulp.task("sass", function () {
    return gulp.src('./Styles/scss/main.scss')
        .pipe(sass())
        .pipe(concat('compiled.css'))
        .pipe(gulp.dest('./Styles/scss/'));
});

gulp.task("css", ["sass"], function () {
    return gulp.src(
        [
            './Styles/scss/compiled.css',
            './Content/Libraries/FormHelper/dist/css/bootstrap-formhelpers.css'
        ])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./Styles/css/'));
});

gulp.task("pre-js", function () {
    return gulp.src(
        [
        './Scripts/custom/pre.js',
        './Content/Libraries/FormHelper/dist/js/bootstrap-formhelpers.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./Scripts/custom/concat/'));
});

// We don't actually use this file, because we get the JS from a CDN
gump.task("post-js", function () {
    return gulp.src(
        [
            './Scripts/jquery-3.3.1.js',
            './Scripts/bootstrap.js'
        ])
        .pipe(concat('post.js'))
        .pipe(gulp.dest('./Scripts/custom/concat'));
});

gulp.task("form-js", function () {
    return gulp.src(
        [
            './Scripts/custom/form.js'
        ])
        .pipe(concat('form.js'))
        .pipe(gulp.dest('./Scripts/custom/concat/'));
});

// Run pre and post js tasks
gulp.task("js", ["pre-js", "post-js", "form-js"], function () { });