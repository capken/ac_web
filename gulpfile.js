var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    jshint = require('gulp-jshint');

var dist = 'web/public';

gulp.task('misc', function() {
  gulp.src([
      'app/favicon.ico',
      'app/images/*',
      'app/*.txt'], { base: 'app/' })
    .pipe(gulp.dest(dist));
});

gulp.task('lint', function() {
  gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', function() {
  gulp.watch('app/**/*.js', ['lint', 'dev']);
  gulp.watch('app/**/*.css', ['dev']);
  gulp.watch('app/**/*.html', ['dev']);
});

gulp.task('dev', ['misc'], function() {
  var assets = useref.assets();

  gulp.src('app/**/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest(dist));
});

gulp.task('deploy', ['misc'], function() {
  var assets = useref.assets();

  gulp.src('app/**/*.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(minifyHtml())
    .pipe(gulp.dest(dist));
});

