var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    mainBowerFiles = require('main-bower-files'),
    print = require('gulp-print'),
    del = require('del');

var clientFolder = 'app';

gulp.task('styles', function() {
    return sass(clientFolder + '/styles/main.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest(clientFolder +'/dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest(clientFolder +'/dist/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    return gulp.src([clientFolder + '/app.js', clientFolder + '/**/*.js', '!' + clientFolder + '/vendors/**/*.js'])
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(clientFolder + '/dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(clientFolder + '/dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

/*gulp.task('vendors', function() {
    return gulp.src(mainBowerFiles(
        {paths: {
            bowerDirectory: 'path/for/bower_components',
            bowerrc: 'path/for/.bowerrc',
            bowerJson: 'path/for/bower.json'
        }}))
        .pipe(print())
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(clientFolder + '/dist'))
        .pipe(notify({ message: 'Scripts task complete' }));
});*/

gulp.task('images', function() {
    return gulp.src(clientFolder + '/images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(clientFolder + '/dist/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
    return del([clientFolder + '/dist/css', clientFolder + '/dist/js', clientFolder + '/dist/img']);
});

gulp.task('watch', function() {
    gulp.watch(clientFolder + '/styles/**/*.scss', ['styles']);
    gulp.watch([clientFolder + '/modules/**/*.js', 'app/*.js'], ['scripts']);
    gulp.watch(clientFolder + '/images/**/*', ['images']);
    livereload.listen();
    gulp.watch(['dist/**']).on('change', livereload.changed);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});



