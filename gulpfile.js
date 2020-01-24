const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: function (file) {
        return '../'.repeat(file.relative.split('/').length) + 'src';
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', function () {
  return gulp.src(JSON_FILES)
    .pipe(gulp.dest('dist'));
});

gulp.task('start', function () {
  nodemon({
    script: 'dist/index.js',
    ext: 'ts',
    env: {
      'NODE_ENV': 'development'
    }
  })
});

gulp.task('default', ['watch', 'assets', 'start']);
