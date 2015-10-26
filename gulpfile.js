'use strict';

// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css');


var cssLocations = [
  './src/css/*.css',
  './src/css_location_2/*.css',
  './src/css/*.scss',
  './src/css_location_2/*.scss'
];

var jsLocations = [
  './src/js/*.js'
];

var imgLocations = [];

var cssBuildLocation = './build/css';
var jsBuildLocation = './build/js';
var imgBuildLocation = './build/img';

/**
 * Processes css/sass files from multiple locations, minifies, and concatenates them.
 * Puts the minified file in the specified build location
 */
gulp.task('js', function() {
  gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


/**
 * Processes js files from multiple locations, minifies, and concatenates them.
 * Puts the minified file in the specified build location
 */
gulp.task('css', function() {
  gulp.src(cssLocations)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest(jsBuildLocation));
});


/**
 * Processes image files from multiple locations.
 * Puts the processed images in the specified build location.
 */
gulp.task('img', function() {
  gulp.src(imgLocations)
    .pipe(gulp.dest(imgBuildLocation));
});


/**
 * Watches for changes in the css and runs the 'css' task whenever a change is saved.
 * Does not generate new files.
 *
 */
gulp.task('css:watch', function() {
  gulp.watch(cssLocations, ['css']);
});


/**
 * Watches for changes in the js and runs the 'js' task whenever a change is saved.
 * Does not generate new files.
 *
 */
gulp.task('js:watch', function() {
  gulp.watch(jsLocations, ['js']);
});


/**
 * Sets the default gulp task to run the css, js, and img tasks
 *
 */
gulp.task('default', ['compile']);