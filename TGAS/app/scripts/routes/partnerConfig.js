({
    //appDir: "./",
    //baseUrl: "../..",
    //dir: "../build",
    name: "partnerMain",
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
    out: "../build/partnerMain-build.js",
    removeCombined: true,
    paths: {
        // Angular
        angular: '../vendor/angular/angular.min',
        cookies: '../vendor/angular/angular-cookies.min',
        route: '../vendor/angular/angular-route.min',
        touch: '../vendor/angular/angular-touch.min',
        animate: '../vendor/angular/angular-animate.min',
        // domReady
        domReady: '../vendor/domReady',
        // iscroll
        iscroll: '../vendor/iscroll/iscroll.min',
    },
    shim: {
        /*
         *对引入的类库，表明依赖关系，并暴露名称
         *需要把此处的名字，在app.js文件中define写上才能使用
         */
        angular: {
            //deps: ['jquery'],
            exports: 'angular'
        },
        cookies: {
            deps: ['angular']
        },
        route: {
            deps: ['angular']
        },
        touch: {
            deps: ['angular']
        },
        animate: {
            deps: ['angular']
        }
    },
    waitSeconds: 0
});