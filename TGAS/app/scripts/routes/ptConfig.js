({
    //appDir: "./",
    //baseUrl: "../..",
    //dir: "../build",
    name: "ptMain",
    optimize: "uglify",//uglify
    uglify: {
        toplevel: true,
        ascii_only: true,
        //true:不压缩，false：压缩
        beautify: false,
        max_line_length: 1000,

        ////How to pass uglifyjs defined symbols for AST symbol replacement,
        ////see "defines" options for ast_mangle in the uglifys docs.
        //defines: {
        //    DEBUG: ['name', 'false']
        //},

        //Custom value supported by r.js but done differently
        //in uglifyjs directly:
        //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
        //false：损毁代码，即变量混淆；
        no_mangle: true
    },
    out: "../build/ptMain-build.js",
    removeCombined: true,
    //baseUrl: "scripts/vendor",
    paths: {
        underscore: '../vendor/underscore.min',
        zepto: '../vendor/zepto.min',
        backbone: '../vendor/backbone.min',
        domReady: '../vendor/domReady',
        iscroll: '../vendor/iscroll/iscroll.min'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        zepto: {
            exports: '$'
        },
        backbone: {
            deps: ['underscore', 'zepto'],
            exports: 'Backbone'
        }
    },
    waitSeconds: 0
});