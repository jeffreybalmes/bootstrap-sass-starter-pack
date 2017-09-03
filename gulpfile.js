const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const plumber     = require('gulp-plumber');
const notify      = require('gulp-notify');

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['bower_components/**/*.scss', 'src/scss/*.scss', 'src/scss/**/*.sass', 'src/scss/**/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);

});

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(plumbError())
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', function() {
    return gulp.src([
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
            'bower_components/jquery/dist/jquery.min.js'
        ])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});


// Move Fonts to src/fonts
gulp.task('fonts', function () {
    return gulp.src(['bower_components/bootstrap-sass/assets/fonts/**/*', 'bower_components/font-awesome/fonts/*' ])
        .pipe(gulp.dest('src/fonts'));
});


// Move Font Awesome CSS to src/css
gulp.task('fa', function() {
  return gulp.src('bower_components/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'))
});

gulp.task('default', ['js','serve', 'fa', 'fonts']);

function plumbError() {
  return plumber({
    errorHandler: function(err) {
      notify.onError({
        templateOptions: {
          date: new Date()
        },
        title: "Gulp error in " + err.plugin,
        message:  err.formatted
      })(err);
      this.emit('end');
    }
  })
}