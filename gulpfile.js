/*jslint node:true */
'use strict';
(function () {

	// Gulp
	var gulp = require('gulp');
	var debug = require('gulp-debug');
	var del = require('del');
	var gulpif = require('gulp-if');
	var argv = require('yargs').argv;
	var notify = require('gulp-notify');
	var runSequence = require('run-sequence');

	// BrowserSync
	var browserSync = require('browser-sync').create();

	// Style/CSS node packages
  var sass = require('gulp-sass');
	var autoprefixer = require('autoprefixer');
	var doiuse = require('doiuse');
	var postcss = require('gulp-postcss');
	var sourcemaps = require('gulp-sourcemaps');

	// JavaScript
	var eslint = require('gulp-eslint');

	// gulp build --production
	var production = !!argv.production;

	// Gulp Config
	var gc = require('./gulpfile.config');

	/**
	 * Build tasks
	 */
	gulp.task('build', ['build:styles', 'build:scripts', 'build:images', 'build:html']);

	gulp.task('build:clean', function(callback) {
		runSequence('clean', 'build', callback);
	});

	gulp.task('build:styles', function () {
		// PostCSS processors
		var processors = [
			autoprefixer({browsers: gc.supportedBrowsers}),
			doiuse({browsers: gc.supportedBrowsers})
		];

		return gulp.src(gc.paths.src.styles)
			.pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
			.pipe(postcss(processors))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(gc.paths.dest.styles));

	});

	gulp.task('build:scripts', function () {
		// todo process scripts
		return gulp.src(gc.paths.src.scripts)
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(gulp.dest(gc.paths.dest.scripts));
	});

	gulp.task('build:images', ['build:images:favicon'], function () {
		return gulp.src(gc.paths.src.images)
			.pipe(gulp.dest(gc.paths.dest.images));
	});

	gulp.task('build:images:favicon', function () {
		return gulp.src(gc.root.src + '/favicon.ico')
			.pipe(gulp.dest(gc.root.dest));
	});

	gulp.task('build:html', function () {
		return gulp.src(gc.paths.src.html)
			.pipe(gulp.dest(gc.paths.dest.html));
	});

	/**
	 * Clean build directory
	 */
	gulp.task('clean', function (callback) {
		del([gc.root.dest]).then(function() {
			callback();
		});
	});

	/**
	 * Watch task
	 */
	gulp.task('watch', ['build', 'browser'], function() {
		gulp.watch(gc.paths.src.styles, ['build:styles']);
		gulp.watch(gc.paths.src.scripts, ['build:scripts']);
		gulp.watch(gc.paths.src.images, ['build:images']);
		gulp.watch(gc.paths.src.html, ['build:html']);
		// gulp.watch(gc.root.dest + '**/*.html').on('change', browserSync.reload);
	});

	/**
	 * Browser sync
	 */
	gulp.task('browser', function() {
		browserSync.init(gc.browserSyncOptions);
	});

	/**
	 * Default task, will just run clean build without watch
	 */
	gulp.task('default', ['build:clean']);

})();
