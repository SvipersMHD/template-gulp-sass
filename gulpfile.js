// 🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤
// 1. declaration de variables
// 🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤
var gulp = require('gulp')
var sass = require('gulp-sass')(require('sass'))
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var imgmin = require('gulp-imagemin');
var uglify = require('gulp-uglify');


// 🥤🥤🥤🥤🥤🥤🥤🥤
// 2. Mes taches 
// 🥤🥤🥤🥤🥤🥤🥤🥤
// pour html
gulp.task('htmlification',function(){
   return gulp.src('dev/*.html')
   .pipe(gulp.dest('prod'));
})
// pour js 
gulp.task('jsification',function(){
   return gulp.src('dev/js/*.js')
   .pipe(uglify(),)
   .pipe(rename(function (path) {
      path.basename += ".min";
   }))
   .pipe(gulp.dest('prod/js'));
})
// pour img 
gulp.task('imagification',function(){
   return gulp.src('dev/img/*')
   .pipe(imgmin())
   .pipe(gulp.dest('prod/img'));
})
// pour sass + min.css + min.css.map 
gulp.task('sassificiation',function(){
   return gulp.src('dev/css/*.scss')
   
   .pipe(sourcemaps.init())
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(rename(function (path) {
      path.basename += ".min";
   }))
   .pipe(autoprefixer({
      cascade: false
   }))
   .pipe(sourcemaps.write(''))
   .pipe(gulp.dest('prod/css'));
})
// pour go live 
gulp.task('browser-sync', function() {
   browserSync.init({
      server: {
         baseDir: "prod"
      }
   });
});

// 🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤
// 3. Executions des taches
// 🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤
gulp.task('observation', gulp.parallel('browser-sync','sassificiation', 'htmlification', 'jsification','imagification',function(){
   gulp.watch("dev/css/**/*.scss", gulp.series('sassificiation'))
   gulp.watch("dev/*.html", gulp.series('htmlification'))
   gulp.watch("dev/js/*.js", gulp.series('jsification'))
   gulp.watch("dev/img/*", gulp.series('imagification'))
   gulp.watch("prod/**/*").on("change", browserSync.reload)
}))

gulp.task('default', gulp.series('observation'))