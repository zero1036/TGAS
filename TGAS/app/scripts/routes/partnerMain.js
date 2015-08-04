require.config({
    paths: {
        // Angular
        //angular: 'http://cdn.bootcss.com/angular.js/1.3.15/angular.min',
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
    }
});
require([
	'angular',
	'partnerApp',
	'domReady',
    'iscroll',
    // 自定义controllers,services,directives,filters都需要在这里添加路径
    //父级控制
    '../controllers/partnerCtrl',
    ////子级控制
    //'controllers/orgCtrlWa',
],
function (angular, orgApp, domReady, iscroll) {
    //'use strict';
    orgApp.constant('ACCESS_LEVELS', {
        pub: 1,
        user: 2
    });

    orgApp.config(['$routeProvider', '$httpProvider', 'ACCESS_LEVELS',
        function ($routeProvider, $httpProvider, ACCESS_LEVELS) {
            $routeProvider
            .when('/home', {
                templateUrl: '../../views/partner/home.html',
                controller: 'partnerCtrl'
            })
            .when('/v1', {
                templateUrl: '../../views/partner/v1.html',
                controller: 'partnerCtrl',
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
                                if (rejection.config.url !== 'api/login')
                                    // 如果当前不是在登录页面
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
                        }
                        return $q.reject(rejection);
                    }

                };
            });
        }
    ]);

    domReady(function () {
        angular.bootstrap(document, ['pApp']);

        //angular.element("html").addClass('ng-app: pApp');

        //$('html').addClass('ng-app: pApp');
    })
});

