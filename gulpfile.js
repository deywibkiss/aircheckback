'use-strict';


var gulp = require('gulp'),
    watch = require('gulp-watch'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path'),
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload')
    filter = require('gulp-filter');

// Using a less plugin to minify css 
var LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new LessPluginCleanCSS({ advanced: true });

// Using Autoprefixer
var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix();

// Paths
var pJSOrigin = './resources/js/';
var pJSDestination = './public/js/';

var pStylesOrigin = './resources/less/';
var pStylesDestination = './public/css/';

var pAppOrigin = pJSOrigin + 'app/';
var pLibsOrigin = pJSOrigin + 'libs/';

// Libs
gulp.task('js-libs', function(){
    return gulp.src([

        pLibsOrigin + 'jquery.js',
        pLibsOrigin + 'bootstrap.min.js',
        pLibsOrigin + 'highlight.min.js',
        pLibsOrigin + 'clipboard.min.js',
        pLibsOrigin + 'chosen.jquery.js',
        pLibsOrigin + 'FileAPI.js',
        pLibsOrigin + 'angular/angular.js',
        pLibsOrigin + 'angular-route/angular-route.js',
        pLibsOrigin + 'angular-resource/angular-resource.js',
        pLibsOrigin + 'angular-highlightjs/angular-highlightjs.js',
        pLibsOrigin + 'angular-textangular/textAngular-rangy.min.js',
        pLibsOrigin + 'angular-textangular/textAngular-sanitize.js',
        pLibsOrigin + 'angular-textangular/textAngular.min.js', // WYSIWYG editor for angular
        pLibsOrigin + 'angular-clipboard/ngclipboard.js',
        pLibsOrigin + 'angular-chosen/angular-chosen.js',
        pLibsOrigin + 'angular-uploader/ng-file-upload.js'
    ])
    .pipe(gp_concat('pulzo-libs.js'))
    .pipe(gulp.dest(pJSDestination))
    .pipe(gp_rename('pulzo-libs.js'));
});

// Angular app
gulp.task('js-angular-app', function(){
    return gulp.src([

        // Main app
        pAppOrigin + 'app.js',

        // Controllers
        pAppOrigin + 'controllers/*.js',

        // Directives
        pAppOrigin + 'directives/*.js',

        // Filters
        pAppOrigin + 'services/*.js',

    ])
    .pipe(gp_concat('pulzo-material-app.js'))
    .pipe(gulp.dest(pJSDestination))
    .pipe(gp_rename('pulzo-material-app.js'));
});


// Compile custom LESS
gulp.task('css-less-app', function() {
   return gulp.src('./resources/less/pulzo-material.less')
        .pipe(plumber())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(sourcemaps.init())
        .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ],
          plugins: [cleancss, autoprefix]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(pStylesDestination)).on('error', gutil.log)
        .pipe(livereload());
});

// Compile framework LESS
gulp.task('css-less-framework', function() {
   return gulp.src('./resources/less/framework/pulzo-framework.less')
        .pipe(plumber())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(sourcemaps.init())
        .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ],
          plugins: [cleancss, autoprefix]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(pStylesDestination)).on('error', gutil.log)
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch([pStylesOrigin + '/**/*.less'], ['css-less-app', 'css-less-framework']);
    gulp.watch([pAppOrigin + '/**/*.js'], ['js-angular-app']);
});

gulp.task('default', [ 'js-libs','js-angular-app', 'css-less-app', 'css-less-framework'], function(){});