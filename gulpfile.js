// Modules
let gulp = require("gulp");
let autoprefixer = require("gulp-autoprefixer");
let concat = require("gulp-concat");
let less = require("gulp-less");
let sourcemaps = require("gulp-sourcemaps");
let uglifycss = require("gulp-uglifycss");
let watch = require("gulp-watch");

// Properties
let props = {
  source: "./src/styles",
  browserSupport: "last 4 versions",
  build: "./public/assets/css"
};

// Assets: Argon
gulp.task("assets:argon", () => {
  return gulp
    .src(`${props.source}/argon/argon.css`)
    .pipe(
      uglifycss({
        maxLineLen: 80,
        uglyComments: true
      })
    )
    .pipe(concat("theme.min.css"))
    .pipe(gulp.dest(props.build));
});

// Compile: Less
gulp.task("compile:less", () => {
  return gulp
    .src(`${props.source}/app.less`)
    .pipe(less())
    .pipe(
      autoprefixer({
        browsers: [props.browserSupport],
        cascade: false
      })
    )
    .pipe(concat("app.css"))
    .pipe(gulp.dest(props.build))
    .pipe(
      uglifycss({
        maxLineLen: 80,
        uglyComments: true
      })
    )
    .pipe(concat("app.min.css"))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(props.build));
});

// Watch
gulp.task("watch", () => {
  gulp.watch(`${props.source}/**/*.less`, ["compile:less"]);
});

// Release
gulp.task("release", ["assets:argon", "compile:less"]);

// Build
gulp.task("build", ["release", "watch"]);

// Default
gulp.task("default", ["release"]);
