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
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');

//are we in build or production mode?
var buildProduction = utilities.env.production;


gulp.task('serve', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('babel', function() {
	return browserify({ entries: ['./js/trivimon-interface.js'] })
		.transform(babelify.configure({
			presets: ["es2015"]
		}))
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./public/js'));
});
