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
	var postcss = require('gulp-postcss'); // postCSS processor
	var sass = require('gulp-sass');
	var sourcemaps = require('gulp-sourcemaps');

	/**
	 * Script node packages
	 */
	var eslint = require('gulp-eslint');

	/**
	 *  Source and destination paths
	 */
	var root = {
		dev: 'src/',
		production: 'dist/',
		html: 'index.html'
	};

	var paths = {
		dev: {
			app: [root.dev + 'app'],
			styles: [root.dev + 'styles'],
			fonts: [root.dev + 'fonts'],
			favicon: [root.dev + 'favicon'],
			images: [root.dev + 'images']
		},
		production: {
			scripts: root.production + 'assets/js',
			styles: root.production + 'assets/css',
			images: root.production + 'assets/images'
		}
	};

	var files = {
		dev: {
			scss: paths.dev.styles + '/**/*.scss',
			typescript: paths.dev.app + '/**/*.ts',
			js: paths.dev.app + '/**/*.js',
			css: [paths.dev.styles + '/*.css', paths.dev.styles + '/*.map']
		},
		production: {
			js: '/**/*.js',
			css: '/**/*.css',
			html: '/**/*.html',
			images: '/**/*.jpg'
		}
	}

	var supportedBrowsers = ['> 1%', 'not ie <= 9'];

	// PostCSS processors
	var postcssProcessors = [
		autoprefixer({browsers: supportedBrowsers}),
		doiuse({browsers: supportedBrowsers})
	];

	var defaultTestBrowser = "Google Chrome Canary";

	var bsProduction = {
		server: root.production,
		files: [
			paths.production.styles + '/*.css',
			paths.production.scripts + '/*.js',
			paths.production.images + '/*.*'
		],
		browser: defaultTestBrowser
	};

	/*
	 * Development
	 */

	gulp.task('dev', ['dev:styles', 'dev:watch'])

	// SCSS and PostCSS process styles, adds sourcemap
	gulp.task('dev:styles', ['dev:clean:styles'], function () {
		return gulp.src(files.dev.scss)
			.pipe(sourcemaps.init())
    	.pipe(sass().on('error', sass.logError))
			.pipe(postcss(postcssProcessors))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(paths.dev.styles.toString()));
	});

	// Clean
	gulp.task('dev:clean:styles', function() {
		del.sync(files.dev.css);
	});

	// Watch files
	gulp.task('dev:watch', ['dev:browser'], function() {
		gulp.watch(files.dev.scss, ['dev:styles']);
		gulp.watch([root.html, files.dev.js]).on('change', browserSync.reload);
	});

	// Launch BrowserSync
	gulp.task('dev:browser', function() {
		browserSync.init({
			server: '.',
			files: [
				paths.dev.styles + '/*.css',
				paths.dev.app + '/*.js',
				paths.dev.images + '/*.*'
			],
			browser: defaultTestBrowser
		});
	});

	// Launch dev as default
	gulp.task('default', ['dev']);

})();
