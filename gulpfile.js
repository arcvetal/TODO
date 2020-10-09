const gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync').create(),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    way = require('path'),
    replace = require('gulp-replace'),
    bulkSass = require('gulp-sass-bulk-import');

const path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: './build',
        js: './build/js',
        css: './build/css',
        img: './build/img',
        svg: './build/img/svg',
        fonts: './build/fonts'
    },
    src: { //Пути откуда брать исходники
        html: './src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: './src/js/jsblocks/*.js',//В стилях и скриптах нам понадобятся только main файлы
        style: './src/sass/**/*.scss',
        img: './src/img/*.*', 
        svg: './src/img/svg/*.svg',
        fonts: './src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: './src/**/*.html',
        js: './src/js/main.js',
        style: './src/style/**/*.scss',
        img: './src/img/**/*.*',
        fonts: './src/fonts/**/*.*'
    },
    clean: './build/**'
};
//
// const configSvg = {
//     mode: {
//       css: {
//         render: {
//           css: true
//         }
//       }
//     }
//   };


// ---------- HTML

gulp.task('html:build', function () {
    return gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(plumber()) // пламберим
        .pipe(rigger()) //Прогоним через rigger
        .pipe(htmlmin({ collapseWhitespace: true })) // сжимаем
        .pipe(gulp.dest('./src')) //Выплюнем их в папку build
        .pipe(browserSync.reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
//
//
//
gulp.task('styles', function () {
    return gulp.src('./src/sass/style.scss')
        .pipe(bulkSass()) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(plumber()) // пламберим
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
          cascade: false
        }))
        .pipe(gulp.dest('./src/css'))
        .pipe(csso({
          restructure: false,
          sourceMap: true,
          debug: true
        }))
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream())  // =============== потом поменять на билд

});
//
//
//------------------------ IMG
//
gulp.task('image:build', function () {
    return gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

// gulp.task('svgSprite', function () {
//     return gulp.src('./src/img/svg/*.svg') // svg files for sprite
//         .pipe(svgSprite(configSvg))
//         .pipe(gulp.dest('./src/img/svg'));
// });

gulp.task('svgSprite', function () {
    return gulp
        .src(path.src.svg)
        .pipe(svgmin(function (file) {
            var prefix = way.basename(file.relative, way.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]

            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgstore())
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('src/sprite'));
});
// 
//------------------------ FONTS
//
gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});
//
//
//
//------------------------JS
//
gulp.task('js:build', function () {
    return gulp.src(path.src.js) //Найдем наш main файл
        .pipe(plumber()) // пламберим
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        // .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        // .pipe(rename('script.min.js'))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('src/js'))//Выплюнем готовый файл в build
        .pipe(browserSync.stream()) ;//И перезагрузим сервер
});


// gulp.task('build', gulp.series('html:build', 'styles', 'image:build', 'fonts:build', 'js:build'));


// gulp.task('browserSync', function(done) {
//   browserSync.init({
//     server: {
//       baseDir: './src/'
//     },
//     port: 3000
//   });
//   done();
// })

// gulp.task('browserReload', function(done) {
//   browserSync.reload();
//   done();
// })



// gulp.task('watcher', function () {
//   gulp.watch('./src/scss/**/*.scss', gulp.series('styles'));
// });






//=====================================================================

gulp.task('work', function() {

    browserSync.init({
        server: "./src/"
    });

    gulp.watch("./src/sass/**/*.scss", gulp.parallel('styles'));
    gulp.watch("./src/*.html").on('change', browserSync.reload);
    gulp.watch('./src/js/jsblocks/*.js', gulp.parallel('js:build'));
    gulp.watch('./src/img/*', browserSync.reload);
    gulp.watch('./src/fonts/*', browserSync.reload);
    gulp.watch('./src/img/svg/*', gulp.parallel('svgSprite'));
});

// // Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function() {
//     return gulp.src("app/scss/*.scss")
//         .pipe(sass())
//         .pipe(gulp.dest("app/css"))
//         .pipe(browserSync.stream());
// });
//
// gulp.task('default', ['serve']);
//













//
//
// //----------------- WATCHER
//
// gulp.task('watch', function(){
//     watch([path.watch.html], function(event, cb) {
//         gulp.start('html:build');
//     });
//     watch([path.watch.style], function(event, cb) {
//         gulp.start('style:build');
//     });
//     watch([path.watch.js], function(event, cb) {
//         gulp.start('js:build');
//     });
//     watch([path.watch.img], function(event, cb) {
//         gulp.start('image:build');
//     });
//     watch([path.watch.fonts], function(event, cb) {
//         gulp.start('fonts:build');
//     });


// // // //------------------CLEAN
// gulp.task('clean', function (cb) {
//   return rimraf(path.clean, cb);
// });



// ---------- HTML


// gulp.task('html:build', function () {
//     return gulp.src(path.src.html) //Выберем файлы по нужному пути
//         .pipe(plumber()) // пламберим
//         .pipe(rigger()) //Прогоним через rigger
//         .pipe(htmlmin({ collapseWhitespace: true })) // сжимаем
//         .pipe(gulp.dest(path.build.html)); //Выплюнем их в папку build
//         // .pipe(browserSync.reload({stream: true})); //И перезагрузим наш сервер для обновлений
// });


// // // ---------  CSS

// gulp.task('styles', function () {
//     return gulp.src('./src/scss/style.scss')
//         .pipe(bulkSass()) //Выберем наш main.scss
//         .pipe(sourcemaps.init()) //То же самое что и с js
//         .pipe(plumber()) // пламберим
//         .pipe(rigger()) //Прогоним через rigger
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer({
//             cascade: false
//         }))
//         .pipe(csso({
//             restructure: false,
//             sourceMap: true,
//             debug: true
//         }))
//         .pipe(rename('style.min.css'))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(path.build.css));
//         // .pipe(browserSync.stream());  // =============== потом поменять на билд
//         // .pipe(browserSync.stream());

// });

// // //------------------------ IMG
// //


// gulp.task('image:build', function () {
//     return gulp.src(path.src.img) //Выберем наши картинки
//         .pipe(imagemin())
//         .pipe(gulp.dest(path.build.img)); //И бросим в build
//         // .pipe(reload({stream: true}));
// });



// // //------------------------ SVG
// //

// gulp.task('svgSprite', function() {

//     return gulp.src('source/img/*.svg')
//       .pipe(svgstore({
//         inlineSvg: true
//       }))
//       .pipe(rename('sprite.svg'))
//       .pipe(gulp.dest(path.build.svg));
// });


// // //------------------------ FONTS
// //
// gulp.task('fonts:build', function() {
//     return gulp.src(path.src.fonts)
//         .pipe(gulp.dest(path.build.fonts));
// });


// // //------------------------JS
// //
// gulp.task('js:build', function () {
//     return gulp.src(path.src.js) //Найдем наш main файл
//         .pipe(plumber()) // пламберим
//         .pipe(rigger()) //Прогоним через rigger
//         .pipe(sourcemaps.init()) //Инициализируем sourcemap
//         .pipe(uglify()) //Сожмем наш js
//         .pipe(sourcemaps.write()) //Пропишем карты
//         // .pipe(rename('script.min.js'))
//         .pipe(rename('mains.js'))
//         .pipe(gulp.dest(path.build.js));//Выплюнем готовый файл в build
//         // .pipe(browserSync.reload());//И перезагрузим сервер
// });

// gulp.task('js:copyjquery', function () {
//   return gulp.src('src/js/jquery-3.4.1.min.js')
//     .pipe(gulp.dest('build/js'))
// });

// gulp.task('js:copyslick', function () {
//   return gulp.src('src/js/slick.min.js')
//     .pipe(gulp.dest('build/js'))
// });

// gulp.task('js:copyslickstyle', function () {
//   return gulp.src('src/css/slick.css')
//     .pipe(gulp.dest('build/css'))
// });


// gulp.task('js:include', function () {
//   return gulp.src('src/js/script.js')
//     .pipe(plumber())
//     .pipe(rigger())
//     .pipe(gulp.dest('build/js'))
// });

// gulp.task('js:minify', function () {
//   return gulp.src('build/js/script.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('build/js'))
// });

// gulp.task('build', gulp.series('clean', 'html:build', 'styles', 'image:build', 'svgSprite', 'fonts:build','js:copyjquery',
// 'js:copyslick', 'js:copyslickstyle', 'js:include', 'js:minify'));
