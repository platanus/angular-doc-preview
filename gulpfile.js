var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    bump = require('gulp-bump'),
    notify = require('gulp-notify'),
    git = require('gulp-git'),
    size = require('gulp-size'),
    ngannotate = require('gulp-ng-annotate'),
    npm = require('npm'),
    prompt = require('gulp-prompt'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass');

var paths = {
  src: ['./src/index.js','./src/*.js'],
  sass: ['./sass/*.scss'],
  dist: ['./dist/*.js']
};

var sourceMin = 'angular-doc-preview.min.js';
var source = 'angular-doc-preview.js';

gulp.task('js-lint', function() {
  return gulp.src(paths.src)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', ['js-lint', 'build-src', 'build-min-src', 'build-css', 'build-sass'], function() {
  return gulp.src(paths.dist)
    .pipe(notify('Build finished'));
});

gulp.task('build-src', function() {
  return gulp.src(paths.src)
    .pipe(ngannotate())
    .pipe(concat(source))
    .pipe(size())
    .pipe(gulp.dest('dist'));
});

gulp.task('build-min-src', function() {
  return gulp.src(paths.src)
    .pipe(ngannotate())
    .pipe(uglify())
    .pipe(concat(sourceMin))
    .pipe(size())
    .pipe(gulp.dest('dist'));
});

gulp.task('build-sass', function() {
  return gulp.src(paths.sass)
    .pipe(gulp.dest('dist'));
});

gulp.task('build-css', function() {
  gulp.src(paths.sass)
    .pipe(sourcemaps.init())
      .pipe(sass({errLogToConsole: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('bump', function (cb) {
  var versionType = 'major';
  gulp.src(['.']).pipe(
    prompt.prompt({
      type: 'list',
      name: 'bump',
      message: 'What type of bump would you like to do?',
      choices: ['patch', 'minor', 'major']
    }, function(res){
      versionType = res.bump;
      gulp.src(['./bower.json', './package.json'])
        .pipe(bump({type: versionType}))
        .pipe(gulp.dest('./'))
        .on('end', function(){
          cb();
        });
    }));
});

gulp.task('publish-git', ['bump'], function (cb) {
  var pkg = require('./package.json');
  var msg = 'Bumps version '+pkg.version;
  gulp.src('./*.json')
    .pipe(git.add())
    .pipe(git.commit(msg))
    .pipe(git.tag('v'+pkg.version, msg, function(){
      git.push('origin', 'master', { args: '--tags' }, function(){
        cb();
      });
    }));
});

gulp.task('publish-npm', ['publish-git'], function(cb) {
  npm.load({}, function(error) {
    if (error) return console.error(error);
    npm.commands.publish(['.'], function(error) {
      if (error) return console.error(error);
      cb();
    });
  });
});
