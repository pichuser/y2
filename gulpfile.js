'use strict';
var jade = require('gulp-jade');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var open = require('gulp-open');
var gulpFilter = require('gulp-filter');

var paths = {
    baseTs: ['src/ts/**/*.ts'],
    html: ['src/**/*.html'],
    reloadBrowser: ['dist/**/all.js', 'dist/**/index.html', 'dist/**/all.css',
    'yandex/**/*.js'],
    allJade: ['src/jade/**/*.jade'],
    testTs: ['src/test/**/*ts']
};
paths.reloadBrowser.push(paths.testTs[0]);


gulp.task('templates', function() {
    var YOUR_LOCALS = {};
    gulp.src(paths.allJade)
        .pipe(plumber())
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
       // .pipe(replace(/id\=\"class_x3D__x22_(.+?)_x22_(.*?)\"/gi, 'class="$1"'))
        //.pipe(htmlreplace({js: files}))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist'));
    //});
});
var port = 3000;
gulp.task('open', ['connect'], function(){
    var options = {
        uri: 'http://localhost:' + port + '/dist/unit-test.mocha.html'
    };
    gulp.src('')
        .pipe(open(options));
    gulp.src('')
        .pipe(open({uri: 'http://localhost:' + port + '/yandex/index.html'}));
});

var browserSync = require('browser-sync');

gulp.task('connect', ['ts', 'sass', 'copy_html', 'templates', 'test_ts'], function() {
    browserSync.init({
        port: port,
        open: false,
        directory: true,
        server: {
            baseDir: "./"
        },
        files: ['dist/css/all.css']
    });
});

gulp.task('copy_html', function(){
   return gulp.src(paths.html)
    .pipe(gulp.dest('dist'));
});

gulp.task('reloadBrowser', function () {
    gulp.watch(paths.reloadBrowser, browserSync.reload);
});

gulp.task('watcher', function () {
    gulp.watch(paths.reloadBrowser, ['reloadBrowser']);
    gulp.watch(paths.baseTs, ['ts']);
    gulp.watch(paths.testTs, ['test_ts']);
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch(paths.html, ['copy_html']);
    watch(paths.allJade, function(){gulp.run('templates')});
    gulp.run('open');
});

gulp.task('default', ['connect', 'ts', 'sass', 'watcher', 'copy_html', 'templates', 'test_ts']);

// Compile typescript sources
gulp.task('ts', function() {
    gulp.src(paths.baseTs, {base: '.'})
        .pipe(sourcemaps.init())
        .pipe(ts({module: 'commonjs',
            "outFile": 'all.js'
        ,  "target": "ES5"}))
        .js
        .pipe(sourcemaps.write('maps',{includeContent: false, sourceRoot: '/src/ts'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('test_ts', function() {
    gulp.src(paths.testTs, {base: '.'})
        .pipe(sourcemaps.init())
        .pipe(ts({module: 'commonjs',
            "outFile": 'test.js'
            ,  "target": "ES5"}))
        .js
        .pipe(sourcemaps.write('maps',{includeContent: false, sourceRoot: '/src/test'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch',['ts'], function() {
    gulp.watch('src/**/*.ts', ['ts']);
});

gulp.task('sass', function () {
    gulp.src(['src/**/*.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('all.css'))
        .pipe(sourcemaps.write('../../maps',{includeContent: false, sourceRoot: '/src'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/css'));
});
