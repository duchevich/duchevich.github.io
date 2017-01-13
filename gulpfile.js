// Подключение модулел используемых сборщиком
var gulp        = require('gulp'),
    del         = require('del'),
    watch       = require('gulp-watch'),
    connect     = require('gulp-connect'),
    runSequence = require('run-sequence'),
    rename      = require("gulp-rename"),

    jade        = require('gulp-jade');    

    less        = require('gulp-less'),
    autoprefixer= require('gulp-autoprefixer'),
    csso        = require('gulp-csso'),
    uncss       = require('gulp-uncss');

    uglify      = require('gulp-uglifyjs');



// Пути и имена файлов
var COMPILED_CSS_FILE_NAME = 'pack.min.css';
var COMPILED_JS_FILE_NAME = 'pack.min.js';
var PATHS = {
    BUILD: {
        PATH:       'build/',
        IMAGES:     'build/images/',
        STYLES:     'build/styles/',
        SCRIPTS:    'build/scripts/',
        FONTS:      'build/fonts/'
    },
    SOURCE: {
        PATH:       'source/',
        IMAGES:     'source/images/',
        STYLES:     'source/styles/',
        SCRIPTS:    'source/scripts/',
        FONTS:      'source/fonts/',
        TEMPLATES:  'source/templates/'
    }
};



// Full cleaning the build folder
gulp.task('Clean', function(cb) {
    del([PATHS.BUILD.PATH + '*'], cb);
});



// Start web server and livereload
gulp.task('connect', function() {
  connect.server({
    root: './build/',
    port: 3000,
    livereload: true
  })
});



// Операция копирования картинок и шрифтов с source в build
gulp.task('Copy:Images', function() {
    gulp.src(PATHS.SOURCE.IMAGES + '/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(gulp.dest(PATHS.BUILD.IMAGES));
});

// Операция копирования
gulp.task('Copy:Fonts', function() {
    gulp.src(PATHS.SOURCE.FONTS + '/**/*.*')
        .pipe(gulp.dest(PATHS.BUILD.FONTS));
});

gulp.task('Copy', ['Copy:Images', 'Copy:Fonts']);



// Компиляция jade
gulp.task('Jade:Common', function(){
  return gulp.src(PATHS.SOURCE.TEMPLATES + '/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(PATHS.BUILD.PATH + '/'))
        .pipe(connect.reload());
});

gulp.task('Jade', ['Jade:Common']);



// Компиляция less, автоматическое добавление префиксов к свойствам, минификация
gulp.task('Less:Common', function () {
    return gulp.src(PATHS.SOURCE.STYLES + '/_pack.less')
        .pipe(less())
        .pipe(autoprefixer({browsers:['> 0%']}))
        .pipe(rename(COMPILED_CSS_FILE_NAME))
        .pipe(csso())
        .pipe(gulp.dest(PATHS.BUILD.STYLES + '/'))
        .pipe(connect.reload());
});

gulp.task('Less', ['Less:Common']);



// Склеивание js файлов и их минификация
gulp.task('JavaScript:Common', function() {
    return gulp.src(PATHS.SOURCE.SCRIPTS + '/**/*.js')
        .pipe(uglify(COMPILED_JS_FILE_NAME, {
            mangle: false
        }))
        .pipe(gulp.dest(PATHS.BUILD.SCRIPTS + '/'))
        .pipe(connect.reload());
});

gulp.task('JavaScript', ['JavaScript:Common']);



// Чистка стилей от "мусора" перед выпуском проекта в продакшн
gulp.task('uncss', function() {
    return gulp.src(PATHS.BUILD.STYLES + '/*.css')
        .pipe(uncss({
            // Игнорируем динамически добавляемые(через js) классы
            ignore: [
                /\w\.in/,
                ".fade",
                ".collapse",
                ".collapsing",
                /(#|\.)navbar(\-[a-zA-Z]+)?/,
                /(#|\.)dropdown(\-[a-zA-Z]+)?/,
                /(#|\.)(open)/,
                ".modal",
                ".modal.fade.in",
                ".modal-dialog",
                ".modal-document",
                ".modal-scrollbar-measure",
                ".modal-backdrop.fade",
                ".modal-backdrop.in",
                ".modal.fade.modal-dialog",
                ".modal.in.modal-dialog",
                ".modal-open",
                ".in",
                ".modal-backdrop"
            ],
            html: ['./build/*.html']
        }))
        .pipe(csso())
        .pipe(gulp.dest(PATHS.BUILD.STYLES + '/'));
});



// Запуск вотчера
gulp.task('watch', ['connect'], function () {
    gulp.watch(PATHS.SOURCE.TEMPLATES + '/**/*.jade', ['Jade:Common']);
    gulp.watch(PATHS.SOURCE.STYLES + '/**/*.less', ['Less:Common']);
    gulp.watch(PATHS.SOURCE.SCRIPTS + '/*.js', ['JavaScript:Common']);
});



// Полная перезборка проекта
gulp.task('default', function(callback) {
    runSequence('Clean', ['Copy', 'Jade', 'Less', 'JavaScript'], callback);
});