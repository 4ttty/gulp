var gulp = require('gulp');

var clean = require('gulp-clean');//清理
var rev = require('gulp-rev');//生成md5后缀
var concat = require('gulp-concat');//合并
var revCollector = require('gulp-rev-collector');//从manifest文件中收集数据并且替换html模板中的链接
var notify = require('gulp-notify');
var runSequence = require('run-sequence');//task顺序执行
var cssmin = require('gulp-minify-css');//压缩css

var config = require('./src/main/webapp/config/config.json');//引用外部配置文件

gulp.task('clean-css',function(){
	gulp.src('src/main/webapp/dest/css',{read:false})
	.pipe(clean())
	.pipe(notify({
		message:'clean done !'	
	}))
});

gulp.task('css',function(){//css处理
	gulp.src('src/main/webapp/static/css/*.css')//加载匹配的文件获取流
	.pipe(rev())//文件名称家md5后缀
	.pipe(gulp.dest('src/main/webapp/dest/css'))//输出目录
	.pipe(rev.manifest({//将文件名称后缀一json形式保存
		merge:true	
	}))
	.pipe(gulp.dest('src/main/webapp/dest/rev/css'))//json文件目录
	.pipe(notify({
		message:'css done !'	//通知执行结果
	}))
	;
});

gulp.task('js',function(){//js处理
	gulp.src('src/main/webapp/static/js/*.js')
	.pipe(rev())
	.pipe(gulp.dest('src/main/webapp/dest/js'))
	.pipe(rev.manifest({
		merge:true	
	}))
	.pipe(gulp.dest('src/main/webapp/dest/rev/js'))
	.pipe(notify({
		message:'js done !'	
	}))
	;
});

gulp.task('cssmin',function(){//合并css
	gulp.src('src/main/webapp/static/css/merge/*.css')
	.pipe(concat('merge.css'))//合并文件名称
	.pipe(cssmin())//压缩
	.pipe(rev())//添加md5后缀
	.pipe(gulp.dest('src/main/webapp/dest/css'))//输出处理后文件
	.pipe(rev.manifest({//将文件信息已json形式保存至rev-manifest.json
		merge:true	
	}))
	.pipe(gulp.dest('src/main/webapp/dest/rev/merge'))//json文件输出目录
	.pipe(notify({
		message:'merge done !'	
	}))
	;
});

gulp.task('replace',function(){
		gulp.src(['src/main/webapp/dest/rev/**/*.json','src/main/webapp/*.jsp'])//读取json文件以及jsp
		.pipe(revCollector({
				replaceReved:false,
				 dirReplacements: {
                'static/js/': '../js/',//链接替换
                'static/css/': '../css/'
         }
		}))
		.pipe(gulp.dest('src/main/webapp/dest/jsp'))//输出
		;

});

//使用外部配置文件

//处理css或者js文件
function doStuff(src,dest){
	return gulp.src(src)
	.pipe(rev())
	.pipe(gulp.dest(dest))
	.pipe(rev.manifest({
		merge:true	
	}))
	.pipe(gulp.dest(dest))
	.pipe(notify({
		message:'doStuff done !'	
	}))
	;
}

//处理jsp
function doJsp(manifest,src,dest){
	return gulp.src([manifest+'/*.json',src])
			.pipe(revCollector({
				replaceReved:false,
				 dirReplacements: {
		        'static/css': '../css'
		 }
		}))
		.pipe(gulp.dest(dest))
		.pipe(notify({
			message:'doJsp done !'	
		}))
		;
}

gulp.task('appcss',function(){
	return doStuff(config.app.cssSrc,config.app.cssDest);
	/*return gulp.src(config.app.cssSrc)
	.pipe(rev())
	.pipe(gulp.dest(config.app.cssDest))
	.pipe(rev.manifest({
		merge:true	
	}))
	.pipe(gulp.dest(config.app.cssDest))
	.pipe(notify({
		message:'doStuff done !'	
	}))
	;*/
});
gulp.task('appreplace',['appcss'],function(){
	return doJsp(config.app.cssDest,config.app.jspSrc,config.app.jspDest);
		/*return gulp.src([config.app.cssDest+'/*.json',config.app.jspSrc])
		.pipe(revCollector({
			replaceReved:false,
			 dirReplacements: {
	        'static/css': '../css'
	 }
	}))
	.pipe(gulp.dest(config.app.jspDest))
	.pipe(notify({
		message:'doJsp done !'	
	}))
	;*/
});


gulp.task('build',function(done){
	runSequence(
		['js'],
		['css'],
		['cssmin'],
		['replace'],
		done
	);

});

gulp.task("default", ['build']);
