

var gulp  = require('gulp'),
	browserSync  = require('browser-sync'),
	babel = require('gulp-babel'),
	es2015 = require("babel-preset-es2015"),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	browserify = require('browserify'),
	//将Browserify的bundle()的输出转换为Gulp可用的vinyl（一种虚拟文件格式）流
	source = require('vinyl-source-stream'),
	clean = require('gulp-clean');


gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  
});

gulp.task('start',['clean','babel','browserify','watch'])


gulp.task('watch',function(){
	browserSync.init({
		server:{
			 files: "**",
			baseDir:'./dist'
		}
	});
	gulp.watch('./src/*',['babel','browserify'])
	.on('change',browserSync.reload);
})

//清空文件夹
gulp.task("clean", function(){
    return gulp.src('./dist/*')
        .pipe(clean());
})

gulp.task('babel',function(){
	return gulp.src('./src/js/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('./dist/js'));
});


//处理依赖关系
gulp.task("browserify", function () {
    return browserify("dist/js/main.js")
    .bundle()
    .pipe(source("bundle.js")) //重命名成bundle.js
    .pipe(gulp.dest("dist/js"));
});



gulp.task('uglify',function(){
	gulp.src('./dist/js/bundle.js')
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('./dest/js'));
})