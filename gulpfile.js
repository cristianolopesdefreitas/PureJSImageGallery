(function() {
    'use strict';

    var gulp = require( 'gulp' ),
        liveServer = require( 'gulp-live-server' ),
        uglify = require( 'gulp-uglify' ),
        concat = require( 'gulp-concat' ),
        cssmin = require( 'gulp-cssmin' ),
        copy = require( 'gulp-copy' ),
        rename = require( 'gulp-rename' ),
        htmlBuild = require( 'gulp-htmlbuild' );

    gulp.task( 'uglify', function() {
        return gulp
            .src([
                'app/js/IE8-polyfill-function-bind.js',
                'app/js/PureJSImageGallery.js'
            ])
            .pipe( concat( 'PureJSImageGallery.concat.js' ) )
            .pipe( uglify() )
            .pipe( rename( 'PureJSImageGallery.min.js' ) )
            .pipe( gulp.dest( 'dist/js' ) );
    });

    gulp.task( 'cssmin', function() {
        return gulp
            .src( 'app/css/PureJSImageGallery.css' )
            .pipe( cssmin() )
            .pipe( rename( 'PureJSImageGallery.min.css' ) )
            .pipe( gulp.dest( 'dist/css' ) );
    });

    gulp.task( 'htmlbuild', function() {
        return gulp
            .src( 'app/*.html' )
            .pipe( htmlBuild({
                js: htmlBuild.preprocess.js(function( block ) {
                    block.write( 'PureJSImageGallery.min.js' );
                    block.end();
                }),
                css: htmlBuild.preprocess.css(function( block ) {
                    block.write( 'PureJSImageGallery.min.css' );
                    block.end();
                }),
                remove: function( block ) {
                    block.end();
                }
            }) )
            .pipe( rename( 'example.html' ) )
            .pipe( gulp.dest( 'dist/' ) );
    });

    gulp.task( 'copy', function() {
        return gulp
            .src([ 'app/js/app.js' ])
            .pipe( copy( 'dist', { prefix: 1 }) );
    });

    gulp.task( 'server', function() {
        var server = liveServer.static([ 'app' ]);

        server.start();

        gulp.watch( 'app/*.html', function( file ) {
            server.notify.apply( server, [ file ]);
        });

        gulp.watch( 'app/js/*.js', function( file ) {
            server.notify.apply( server, [ file ]);
        });

        gulp.watch( 'app/css/*.css', function( file ) {
            server.notify.apply( server, [ file ]);
        });
    });

    gulp.task( 'default', function() {
        gulp.start( 'server' );
    });

    gulp.task( 'dist', function() {
        gulp.start( 'uglify', 'cssmin', 'copy', 'htmlbuild' );
    });
}());
