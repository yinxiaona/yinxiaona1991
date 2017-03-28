var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var webpack = require('webpack');
var config = require('./webpack.config.js');

//compile sass to css use gulp-sass
gulp.task('sass',function(){
	return gulp.src('src/scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
})



//create dev server
gulp.task('server',['sass'],function(){
	return gulp.src('./')
	.pipe(server({
		open:"./src/html/index.html",
		directoryListing: true,
		livereload:true
	}))
})

gulp.task('watch',function(){
	gulp.watch('src/scss/*.scss',['sass']);
	gulp.watch('src/js/*.js',['webpack']);
})

gulp.task('webpack',function(callback){
	webpack(config).run(function(err, stats) {
        callback();
    });
})

gulp.task('default',['server','watch'])

