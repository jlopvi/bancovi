const gulp        = require('gulp'),
      pug         = require('gulp-pug'),
      sass        = require('gulp-sass'),
      prefix      = require('gulp-autoprefixer'),
      browserSync = require("browser-sync").create();


function taskPug() {
    return gulp.src('./dev/views/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
}    

function taskSass() {
    return gulp.src('./dev/sass/*.scss')
                .pipe(sass())
                .on("error", sass.logError)
                .pipe(prefix())
                .pipe(gulp.dest('./dist/css'))
                .pipe(browserSync.stream());
}

	
function reload() {
    browserSync.reload();
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    })
    gulp.watch('./dev/views/**/*.pug', taskPug);
    gulp.watch('./dev/sass/**/*.scss', taskSass);
}
exports.watch = watch
exports.default = function () {
    gulp.watch('./dev/views/**/*.pug', taskPug);
    gulp.watch('./dev/sass/**/*.scss', taskSass);
}