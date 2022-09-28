let gulp = require("gulp");
let concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
let autoprefixer = require("gulp-autoprefixer");
const pug = require("gulp-pug");
let livereload = require("gulp-livereload");
var sourcemaps = require("gulp-sourcemaps");
// var uglify = require("gulp-uglify");
var notify = require("gulp-notify");
// const zip = require("gulp-zip");
// const { on } = require("gulp");
const minify = require("gulp-minify");

gulp.task("html", async function () {
  return gulp
    .src("stage/html/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"))
    .pipe(livereload());
});

gulp.task("css", async function () {
  return gulp
    .src(["stage/css/**/*.css", "stage/css/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass.sync({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload());
});

gulp.task("js", async function () {
  return gulp
    .src("stage/js/*.js")
    .pipe(concat("main.js"))
    .pipe(minify())
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload());
});

gulp.task("watch", async function () {
  require("./server");
  livereload.listen();
  gulp.watch("stage/html/**/*.pug", gulp.series("html"));
  gulp.watch(["stage/css/**/*.css", "stage/css/**/*.scss"], gulp.series("css"));
  gulp.watch("stage/js/*.js", gulp.series("js"));
});
