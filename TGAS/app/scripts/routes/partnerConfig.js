({
    //appDir: "./",
    //baseUrl: "../..",
    //dir: "../build",
    name: "partnerMain",
    optimize: "uglify",//uglify
    out: "../build/partnerMain-build.js",
    removeCombined: true,
    paths: {
        // Angular
        angular: '../vendor/angular/angular',
        cookies: '../vendor/angular/angular-cookies',
        route: '../vendor/angular/angular-route',
        touch: '../vendor/angular/angular-touch',
        // domReady
        domReady: '../vendor/domReady',
        // iscroll
        iscroll: '../vendor/iscroll/iscroll',
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
        }
    },
    waitSeconds: 0
});