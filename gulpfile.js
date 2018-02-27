var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var babelify = require('babelify');

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: 'index.html'
        }
    })
});