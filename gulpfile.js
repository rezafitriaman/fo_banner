/*requered*/
var gulp = require('gulp'),
	order = require("gulp-order"),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps');

var forW = 320,
	forH = 480,
	source = 'sky';

	/*gulp gulp-uglify browser-sync gulp-sass gulp-plumber gulp-autoprefixer gulp-concat gulp-concat-css gulp-rename gulp-sourcemaps*/
/*task*/
gulp.task('concat', function() {
	console.log('concat work!');
  	return gulp.src('src/'+ source +'/js/*.js')
  	.pipe(order([
	    "TweenMax.min.js",
	    "main.js"
	  ]))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public/' + forW + 'x' + forH))
    .pipe(reload({stream:true}));
});

/*make html go to public*/
gulp.task('source_html', function() {
	console.log('source_html work!');
    gulp.src('src/' + source + '/*.html')
    .pipe(gulp.dest('public/' + forW + 'x' + forH))
    .pipe(reload({stream:true}));
});

/*gulp.task('scripts',function() {
	console.log('scripts work!');
	gulp.src(['cv/bower_components/bootstrap/dist/js/bootstrap.js'])
	.pipe(rename('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('cv/js'))
	.pipe(reload({stream:true}));
});*/

gulp.task('sass', function () {
	console.log('sass work!');
  return gulp.src('src/' + source + '/scss/*.scss')
  	.pipe(plumber())
  	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
    browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'android 4']
	}))
    .pipe(gulp.dest('public/' + forW + 'x' + forH))
    .pipe(reload({stream:true}));
});

gulp.task('concatCss', function () {
	console.log('concatCss work!');
  return gulp.src(['!public/' + forW + 'x' + forH +'/all.css','public/' + forW + 'x' + forH + '/*.css'])
  	.pipe(sourcemaps.init())
	    .pipe(concatCss("all.css"))
	    .pipe(gulp.dest('public/' + forW + 'x' + forH))
    .pipe(sourcemaps.write())
    .pipe(reload({stream:true}));
});

gulp.task('html', function () {
	console.log('html work!');
	gulp.src('public/' + forW + 'x' + forH + '/*.html')
	.pipe(reload({stream:true}));
});

/*browser-sync*/
gulp.task('browser-sync', function () {
	console.log('browser-sync work!');
	browserSync({
		server: {
			baseDir: ['public'],
			directory: true,
			proxy: "grqbge-nwx7013:3000"
		}
	});
});

/*watch*/
gulp.task('watch', function() {
	console.log('watch');
	gulp.watch('src/' + source + '/*.html',['source_html']);
	gulp.watch('src/' + source + '/js/*.js', ['concat']);
	/*gulp.watch('cv/js/dev/*.js', ['scripts']);*/
	gulp.watch('src/' + source + '/scss/style.scss', ['sass']);
	gulp.watch('public/' + forW + 'x' + forH + '/style.css', ['concatCss']);
	gulp.watch('public/' + forW + 'x' + forH + '/*.html', ['html']);
});

/*default*/
gulp.task('default',['concat', 'sass', 'concatCss', 'source_html', 'html', 'browser-sync', 'watch']);