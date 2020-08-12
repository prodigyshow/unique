"use strict";

const gulp = require('gulp'),
      webpack = require('webpack-stream'),
      browserSync = require('browser-sync'),
      sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      dist = './dist';

gulp.task('scss', () => {
    return gulp.src('./src/assets/scss/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'}))  
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./src/assets/css')) 
      .pipe(browserSync.reload({stream: true}))
});

gulp.task("copy-html", () => {
    return gulp.src("./src/**/*.html")
                .pipe(gulp.dest(dist))
                .pipe(browserSync.stream());
});

gulp.task("build-js", () => { 
    return gulp.src("./src/js/**/*.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browserSync.reload);
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
                .pipe(gulp.dest(dist + "/assets"))
                .on("end", browserSync.reload);
});

gulp.task("watch", () => {
    browserSync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    gulp.watch('./src/assets/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch("./src/**/*.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/**/*.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));
