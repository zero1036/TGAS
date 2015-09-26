
//加载angular app
var app = require("./com/app.js");

require("./controller/mainCtrl.js");

//权限级别
app.constant('ACCESS_LEVELS', {
    pub: 1,
    user: 2
});

//配置路由
app.config(['$routeProvider', '$httpProvider', 'ACCESS_LEVELS',
    function ($routeProvider, $httpProvider, ACCESS_LEVELS) {
        $routeProvider
        .when('/', {
            template: '<p>lin</p>',
            access_level: ACCESS_LEVELS.pub
        })
        .otherwise({ redirectTo: '/' });


        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $httpProvider.interceptors.push(function ($q, $location, $rootScope) {
            return {
                'response': function (resp) {
                    //if (resp.config.url == 'api/Login/Login') {
                    //    // 假设API服务器返回的数据格式如下:
                    //    // { token: "AUTH_TOKEN" }
                    //    authService.setToken(resp.data.token);
                    //}
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

//配置路由变更监听
app.run(function ($rootScope, $location) {
    // 给$routeChangeStart设置监听
    $rootScope.$on('$routeChangeStart', function (evt, next, curr) {
        console.log("abc");
    });
});

//初始化angular
angular.bootstrap(document, ['wxApp']);

