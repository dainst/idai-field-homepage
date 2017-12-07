var gulp = require('gulp');
var url = require('url');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var typescript = require('gulp-typescript');
var fs = require('fs');
var path = require('path');
var pkg = require('./package.json');
var webserver = require('gulp-webserver');
var argv = require('yargs').argv;
var replace = require('gulp-replace');
var proxy = require('proxy-middleware');

// compile sass and concatenate to single css file in build dir
gulp.task('convert-sass', function () {

    return gulp.src([
        'app/app.scss',
        'node_modules/mdbootstrap/css/bootstrap.css',
        'node_modules/leaflet/dist/leaflet.css',
        'node_modules/leaflet.pm/dist/leaflet.pm.css',
        'node_modules/Leaflet.vector-markers/dist/leaflet-vector-markers.css'

    ])
        .pipe(sass({
            includePaths: [
                'node_modules/idai-components-2/src/scss',
                'node_modules/bootstrap/scss',
                'node_modules/mdi/scss/'
            ], precision: 8
        }))
        .pipe(concat('app.css'))
        .pipe(replace('url(images/', 'url(../img/'))
        .pipe(gulp.dest('app'));
});

gulp.task('copy-img', function () {

    return gulp.src([
        'node_modules/leaflet/dist/images/*.png'
    ])
        .pipe(gulp.dest('img'));
});

function watch() {
    gulp.watch('app/**/*.scss', ['convert-sass']);
}

gulp.task('webserver-watch', function () {

    gulp
        .src(['./'])
        .pipe(webserver({
            port: 8085,
            livereload: true,
            open: 'http://localhost:8085',
            proxies: [
                {
                    source: '/data', target: 'http://field.dainst.org/data/'
                }
            ]
        }));

    watch();
});


const tscConfig = require('./tsconfig.json');
gulp.task('compile', ['convert-sass','copy-img'], function () {
    // fonts
    gulp.src([
        'node_modules/roboto-fontface/fonts/**/*',
        'node_modules/mdi/fonts/**/*'
    ])
        .pipe(gulp.dest('fonts'));

    // templates
    gulp.src('node_modules/idai-components-2/src/templates/**/*').pipe(gulp.dest('src/templates/'));

    // sources
    gulp
        .src('app/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest('app/'));
    // test sources
    return gulp
        .src('test/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest('test/'));
});

function createConfig(path) {
    fs.access(path, fs.F_OK, function (err) {

        if (err) {
            fs.createReadStream(path + '.template').pipe(fs.createWriteStream(path));
        } else {
            console.log('Will not create ' + path + ' from template because file already exists.');
        }
    });
}

// Creates configfiles if the do not exist already
//
gulp.task('create-configs', function (callback) {

    createConfig('./config/config.json');
    createConfig('./config/Configuration.json');

});

gulp.task('versioning', function () {
    var buildNo = "SNAPSHOT";

    if (argv.build !== true && argv.build !== false && argv.build != undefined) {
        buildNo = argv.build;
    } else console.log("No build number given, falling back to \"SNAPSHOT\"");

    var versionString = "v" + pkg.version + " (build #" + buildNo + ")";

    console.log("Updated version string: " + versionString);

    return gulp.src(['app/info-window.html'])
        .pipe(replace(/"VERSION-STRING"/g, versionString))
        .pipe(gulp.dest('dist/app/'));
});
