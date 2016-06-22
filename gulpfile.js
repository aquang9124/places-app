var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

// establish paths object and set path of scss
var paths = {
	scss: './client/static/sass/*.scss',
	js: './client/app/*/*.js'
};

// compile SASS
gulp.task('sass', function() {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest('./client/static/css'));
});

// compile JS files
gulp.task('scripts', function() {
	return gulp.src(['./client/app/module.js', './client/app/config/*.js', paths.js])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./client/dist'));
});

// set up gulp watch task
gulp.task('watch', function() {
	gulp.watch(['./client/app/module.js', './client/app/config/*.js', paths.js], ['scripts']);
	gulp.watch(paths.scss, ['sass']);
});

// set up default task
gulp.task('default', ['sass', 'scripts', 'watch']);