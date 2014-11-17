var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jshint = require('gulp-jshint'),
    size = require('gulp-size');

var opts = {
  dist: 'web/public',
  mode: 'development'
}

var dist = 'web/public';

gulp.task('images', function() {
  var images = gulp.src('app/images/*', { base: 'app/' });
  if(opts.mode === 'development') {
    images.pipe(gulp.dest(dist));
  } else if(opts.mode === 'production') {
    images.pipe(imagemin({
      progressive: true,
      //interlaced: true
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(dist));
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
  //opts.mode = 'development';

  var assets = useref.assets();

  gulp.src('app/**/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest(dist));
});

  opts.mode = 'production';
gulp.task('deploy', ['misc'], function() {

  var assets = useref.assets();

  gulp.src('app/**/*.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify({mangle: false})))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulpif('*.html', minifyHtml({spare: true, empty: true})))
    .pipe(gulp.dest(dist))
    .pipe(size());
});

