/*jslint node:true */
'use strict';

	var root = {
		src: 'src/',
		dest: 'dest/'
	};

	var images = 'png,gif,jpg,jpeg,svg';

	var paths = {
		src: {
			scripts: [root.src + 'scripts/**/*.js'],
			styles: [root.src + 'styles/**/*.scss'],
			images: [root.src + 'images/**/*.{' + images + '}'],
			html: [root.src + '/**/*.html']
		},
		dest: {
			scripts: root.dest + 'js/',
			styles: root.dest + 'css/',
			images: root.dest + 'images/',
			html: root.dest
		}
	};

	var supportedBrowsers = ['> 1%', 'not ie <= 9', 'not OperaMini <= 1000'];

	var browserSyncOptions = {
		server: root.dest,
		files: [
			root.dest + '**/*.*'
		],
		// browser: "Google Chrome Canary"
	};

  module.exports = {
    root: root,
    paths: paths,
    supportedBrowsers: supportedBrowsers,
    browserSyncOptions: browserSyncOptions
  };
