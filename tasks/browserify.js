/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify = require('browserify');
var watchify = require('watchify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {

  var bundleMethod = global.isWatching ? watch : browse;

  var bundler = bundleMethod('./src/main.js');

  var bundle = function() {
    var time = Date.now();
    gutil.log('Starting ' + gutil.colors.cyan('\'bundling\'') + '...');
    return bundler
      .bundle()
      // Report compile errors
      .on('error', function (e) {
        gutil.log('error', e);
      })
      // Use vinyl-source-stream to make the
      // stream gulp compatible. Specifiy the
      // desired output filename here.
      .pipe(source('game.js'))
      // Specify the output destination
      .pipe(gulp.dest('./build/'))
      // Log when bundling completes!
      .on('end', function () {
        var diff = Date.now() - time;
        gutil.log('Finished ' + gutil.colors.cyan('\'bundling\'') + ' after ' + gutil.colors.magenta(diff + ' ms'));
      });
  };

  if (global.isWatching) {
    // Rebundle with watchify on changes.
    bundler.on('update', bundle);
  }

  return bundle();
});

function watch(file) {
  return watchify(browserify(file, watchify.args));
}

function browse(file) {
  return browserify(file);
}
