var gulp = require('gulp');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var clean = require('gulp-clean');

gulp.task('copy-html-files', function() {
    gulp.src(['./app/*.html'], {base: './app'})
        .pipe(gulp.dest('build/'));
});
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8888
  });
});

// default task
gulp.task('default',
  ['lint', 'connect']
);