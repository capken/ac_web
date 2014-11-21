var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jshint = require('gulp-jshint'),
    size = require('gulp-size'),
    argv = require('yargs').argv;

var dist = 'web/public';

gulp.task('images', function() {
  var images = gulp.src('app/images/*', { base: 'app/' });
  if(argv.production) {
    images.pipe(imagemin({
      progressive: true,
      //interlaced: true
      svgoPlugins: [ { removeViewBox: false } ],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(dist));
  } else {
    images.pipe(gulp.dest(dist));
  }
});

gulp.task('fonts', function() {
  gulp.src('bower_components/bootstrap/fonts/*', { 
    base: 'bower_components/bootstrap/'
  }).pipe(gulp.dest(dist));

  gulp.src('bower_components/font-awesome/fonts/*', { 
    base: 'bower_components/font-awesome/'
  }).pipe(gulp.dest(dist));
});

gulp.task('misc', ['images', 'fonts'], function() {
  gulp.src([
      'app/favicon.ico',
      'app/data/*.json',
      'app/*.txt'], { base: 'app/' })
    .pipe(gulp.dest(dist));
});

gulp.task('lint', function() {
  gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', ['misc'], function() {
  var assets = useref.assets();

  gulp.src('app/**/*.html')
    .pipe(assets)
    .pipe(gulpif(
      argv.production,
      gulpif('*.js', uglify({mangle: false}))
    ))
    .pipe(gulpif(
      argv.production,
      gulpif('*.css', minifyCss())
    ))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulpif(
      argv.production,
      gulpif('*.html', minifyHtml({spare: true, empty: true}))
    ))
    .pipe(gulp.dest(dist))
    .pipe(size());
});

gulp.task('default', function() {
  gulp.watch('app/**/*.js', ['lint', 'build']);
  gulp.watch('app/**/*.css', ['build']);
  gulp.watch('app/**/*.html', ['build']);
});
