
var Proxy = require('gulp-connect-proxy');
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
    runSequence = require('run-sequence'),
    templateCache = require('gulp-angular-templatecache'),
    postcss = require('gulp-postcss');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var ngAnnotate = require('gulp-ng-annotate');
var server = require('gulp-server-livereload');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var watchLess = require('gulp-watch-less');
var less = require('gulp-less');

gulp.task('watch', function () {
    watch('./styles/*.less', batch(function (events, done) {
        gulp.start('default', done);
    }));

});

gulp.task('webserver', ['watch'], function () {
    gulp.src('./app')
        .pipe(server({
            livereload: {
                enable: true,
                filter: function (filename, cb) {
                    cb(!/\.(sa|le)ss$|node_modules/.test(filename));
                }
            },
            file: 'index.html',
            directoryListing: false,
            open: true
        }));

});

gulp.task('connect', function() {
    connect.server({
        root: 'app/',
        middleware: function (connect, opt) {
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
    });
    return gulp.src('styles/app.less')
        .pipe(watchLess('styles/app.less'))
        .pipe(less())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['connect']);