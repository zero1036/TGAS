require.config({
    paths: {
        // Angular
        angular: '../vendor/angular/angular.un',
        //cookies: 'vendor/angular/angular-cookies.min',
        //route: 'vendor/angular/angular-route.min',
        //touch: 'vendor/angular/angular-touch.min',
        // domReady
        domReady: '../vendor/domReady',
        // iscroll
        iscroll: '../vendor/iscroll/iscroll.min'
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
        //cookies: {
        //    deps: ['angular']
        //},
        //route: {
        //    deps: ['angular']
        //},
        //touch: {
        //    deps: ['angular']
        //},
    },
    waitSeconds: 0
});
require([
	'angular',
	'partnerApp',
	'domReady',
    'iscroll',
    // 自定义controllers,services,directives,filters都需要在这里添加路径
    //父级控制
    '../controllers/partnerCtrl',
    '../controllers/loginCtrl',
],
function (angular, partnerApp, domReady, iscroll) {
    //'use strict';
    partnerApp.constant('ACCESS_LEVELS', {
        pub: 1,
        user: 2
    });
    //配置路由
    partnerApp.config(['$routeProvider', '$httpProvider', 'ACCESS_LEVELS',
        function ($routeProvider, $httpProvider, ACCESS_LEVELS) {
            $routeProvider
            .when('/', {
                templateUrl: '/app/views/partner/home.html',
                controller: 'partnerCtrl',
                access_level: ACCESS_LEVELS.user
            })
            .when('/home', {
                templateUrl: '/app/views/partner/home.html',
                controller: 'partnerCtrl',
                access_level: ACCESS_LEVELS.user
            })
            .when('/yjincrease', {
                templateUrl: '/app/views/partner/yjincrease.html',
                controller: 'partnerCtrl',
                access_level: ACCESS_LEVELS.user
            })
            .when('/yjdetails', {
                templateUrl: '/app/views/partner/yjdetails.html',
                controller: 'partnerCtrl',
                access_level: ACCESS_LEVELS.user
            })
            .when('/login', {
                templateUrl: '/app/views/sys/login.html',
                controller: 'loginCtrl',
                access_level: ACCESS_LEVELS.pub
            });// end


            $httpProvider.defaults.withCredentials = true;
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            $httpProvider.interceptors.push(function ($q, $location, $rootScope) {
                return {
                    'response': function (resp) {
                        return resp;
                    },
                    'responseError': function (rejection) {
                        // 错误处理
                        switch (rejection.status) {
                            case 401:
                                //if (rejection.config.url !== 'api/login')
                                //    // 如果当前不是在登录页面
                                $rootScope.$broadcast('auth:loginRequired');
                                break;
                            case 403:
                                $rootScope.$broadcast('auth:forbidden');
                                break;
                            case 404:
                                $rootScope.$broadcast('page:notFound');
                                break;
                            case 500:
                                $rootScope.$broadcast('server:error');
                                break;
                            case 410:
                                $rootScope.$broadcast('server:redirect');
                                break;
                        }
                        return $q.reject(rejection);
                    }

                };
            });
        }
    ]);
    //配置监听
    partnerApp.run(function ($rootScope, $location, authService) {
        //给$routeChangeStart设置监听
        $rootScope.$on('$routeChangeStart', function (evt, next, curr) {
            //if (!authService.isAuthorized(next.$$route.access_level)) {
            //    window.location.href = '#/login?#redirect=' + location.pathname + location.hash;
            //}
        });

        //监听验证失败404
        $rootScope.$on('auth:loginRequired', function (e) {
            window.location.href = '#/login?#redirect=' + location.pathname + location.hash;
        });

        //监听微信重定向410
        $rootScope.$on('server:redirect', function (e) {
            window.location.reload();
        });
    });
    //domReady
    domReady(function () {
        angular.bootstrap(document, ['pApp']);

        //angular.element("html").addClass('ng-app: pApp');

        //$('html').addClass('ng-app: pApp');
    })
});

