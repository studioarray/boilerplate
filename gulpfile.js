(function () {
	'use strict';

	/**
	 * Gulp node packages
	 */
	var gulp = require('gulp'); // Base Gulp package
	var browserSync = require('browser-sync').create();
	var del = require('del'); // Delete folders and files

	/**
	 * Style/CSS node packages
	 */
	var autoprefixer = require('autoprefixer'); // prefixes CSS code
	var doiuse = require('doiuse'); // check for browser support against caniuse db
	var lost = require('lost'); // postCSS grid system
	var postcss = require('gulp-postcss'); // postCSS processor
	var precss = require('precss'); // Use SASS-like code in postCSS
	var sourcemaps = require('gulp-sourcemaps');

	/**
	 * Script node packages
	 */
	var eslint = require('gulp-eslint');

	/**
	 *  Source and destination paths
	 */
	var root = {
		src: 'src/',
		dest: 'dest/'
	};

	var paths = {
		src: {
			scripts: [root.src + 'scripts/**/*.js'],
			styles: [root.src + 'styles/**/*.css'],
			images: [root.src + 'images/**/*.*']
		},
		dest: {
			scripts: root.dest + 'js/',
			styles: root.dest + 'css/',
			images: root.dest + 'images/'
		}
	};

	var supportedBrowsers = ['> 1%', 'not ie <= 9'];

	var browserSyncOptions = {
		server: root.dest,
		files: [
			paths.dest.styles + '*.css',
			paths.dest.scripts + '*.js',
			paths.dest.images + '*.*'
		],
		browser: "Google Chrome Canary"
	};

	/**
	 * Build tasks
	 */
	gulp.task('build', ['build:styles', 'build:scripts', 'build:images']);

	gulp.task('build:styles', ['clean:styles'], function () {
		// PostCSS processors
		var processors = [
			precss({}),
			lost,
			autoprefixer({browsers: supportedBrowsers}),
			doiuse({browsers: supportedBrowsers})
		];

		// PostCSS process styles, add sourcemap
		return gulp.src(paths.src.styles)
			.pipe(sourcemaps.init())
			.pipe(postcss(processors))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(paths.dest.styles));
	});

	gulp.task('build:scripts', ['clean:scripts'], function () {
		// todo process scripts
		return gulp.src(paths.src.scripts)
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(gulp.dest(paths.dest.scripts));
	});

	gulp.task('build:images', ['clean:images'], function () {
		// todo process images
		return gulp.src(paths.src.images)
			.pipe(gulp.dest(paths.dest.images));
	});

	/**
	 * Clean tasks
	 */
	gulp.task('clean', ['clean:images', 'clean:styles', 'clean:scripts']);

	gulp.task('clean:images', function() {
		del.sync([paths.dest.images]);
	});

	gulp.task('clean:styles', function() {
		del.sync([paths.dest.styles]);
	});

	gulp.task('clean:scripts', function() {
		del.sync([paths.dest.scripts]);
	});

	/**
	 * Watch task
	 */
	gulp.task('watch', ['build', 'browser'], function() {
		gulp.watch(paths.src.styles, ['build:styles']);
		gulp.watch(paths.src.scripts, ['build:scripts']);
		gulp.watch(paths.src.images, ['build:images']);
	});

	/**
	 * Browser sync
	 */
	gulp.task('browser', function() {
		browserSync.init(browserSyncOptions);
	});

	/**
	 * Default task, will just run build without watch
	 */
	gulp.task('default', ['build']);

})();
