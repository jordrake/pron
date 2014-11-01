"use strict";

var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    mocha = require('gulp-mocha-phantomjs'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    js = 'src/**/*.js',
    specs = 'src/**/*.spec.js',
    sourcesOnly = [js, '!' + specs];

gulp.task('test:bundle', ['build'], function () {
    return gulp.src(specs)
        .pipe(concat('test-bundle.js'))
        .pipe(browserify())
        .pipe(gulp.dest("./"));
});

gulp.task('test:runner', function () {
    return gulp.src('runner.html')
        .pipe(mocha());
});

gulp.task('test:clean', function () {
   del('test-bundle.js');
});

gulp.task('test', function (done) {
    runSequence('test:bundle', 'test:runner', 'test:clean', done);
});

gulp.task('build', ['lint'], function () {
    return gulp.src(sourcesOnly)
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('lint', function () {
    return gulp.src(sourcesOnly)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});