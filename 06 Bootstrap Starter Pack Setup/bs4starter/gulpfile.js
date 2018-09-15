// *after creating package.json file and node_modules folder in bs4starter 
// dir (npm init command creates package.json file while commands like
// npm install “PACKAGENAME1” “PACKAGENAME2” --save install 
// dependencies and puts their name on package.json file) we  
// globally install gulp-cli with command, npm install -g gulp-cli.
// after that in bs4starter directory we enter command, gulp, which does 
// our tasks below filling src dir and opens server on localhost:3000.
// we create our index.html file in src folder and link css & js files.
// whenever we open a project we'd use npm install (to bring node_modules dir) 
// and npm start commands (start script is tied to gulp in package.json file).
// so we can safely delete our node_modules folder and folders other than  
// scss and index.html inside src folder at the end of each project*

// gulp can be used for anything. we will use it for compiling sass to css, 
// to move files from node_modules folder to our custom src folder, 
// to run our dev server with browserSync
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass, move to src/css & Inject Into Browser
// bootstrap.scss is a collection of all sass files that we want to compile
// we also want to compile our own sass file inside src/scss dir
gulp.task('sass', function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
    .pipe(sass()) // compiles to css
    .pipe(gulp.dest("src/css")) // destination of css
    .pipe(browserSync.stream()); // for instant refreshing when css changes
});

// Move JS Files to src/js
gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream()); // for instant refreshing when js changes
});

// Watch Sass & Server: serve our files in sass
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: "./src" // sets up server for src folder on localhost:3000
  });
// we are watching sass files so that everytime we save them they are compiled to css
  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);// watch html files
});

// Move Fonts Folder to src/fonts
gulp.task('fonts', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
});

// Move Font Awesome CSS to src/css
gulp.task('fa', function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
});

// creates default gulp task so that when we run gulp it wud run all tasks above
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
