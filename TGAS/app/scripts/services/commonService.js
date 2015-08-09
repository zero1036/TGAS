//'use strict'
define(['angular'], function (services) {
    var services = angular.module('baseServiceModule', []);
    //身份验证服务
    services.factory('authService', function ($window, $cookieStore, $timeout, ACCESS_LEVELS) {
        var token = $cookieStore.get('token');
        return {
            isAuthorized: function (lvl) {
                if (lvl == ACCESS_LEVELS.pub) {
                    return true;
                }
                else {
                    //return token != undefined && token != null;

                    var t = $cookieStore.get('__RequestVerificationToken');
                    if (t == undefined) {
                        return false;
                    }
                }
            },
            getToken: function () {
                return token;
            },
            logout: function () {
                $cookieStore.remove('user');
                _user = null;
            }
        };
    });
    //基础服务
    services.factory('commonService', function ($window, $cookieStore, $timeout) {
        var service = {};

        /*--------------------- Session Key ----------------------------*/

        //api base url
        service.SESSION_KEY_API_DEFAULT_URL = 'API_DEFAULT_URL';
        //當前用戶
        service.SESSION_KEY_CURRENT_USER = 'CURRENT_USER';
        //用戶菜單
        service.SESSION_KEY_CURRENT_USER_MENU = 'CURRENT_USER_MENU';
        //用戶權限
        service.SESSION_KEY_CURRENT_USER_PERMISSION = 'CURRENT_USER_PERMISSION';

        /*--------------------- Session Key ----------------------------*/

        service.getAPIDefaultUrl = function () {
            var val = null;
            if (service.getSession(service.SESSION_KEY_API_DEFAULT_URL) != null && service.getSession(service.SESSION_KEY_API_DEFAULT_URL) != undefined) {
                val = service.getSession(service.SESSION_KEY_API_DEFAULT_URL);
            }
            return val;
        };

        //当前用户菜单
        service.getCurrentUserMenu = function () {
            var val = null;
            if (service.getSession(service.SESSION_KEY_CURRENT_USER_MENU) != null && service.getSession(service.SESSION_KEY_CURRENT_USER_MENU) != undefined) {
                val = service.getSession(service.SESSION_KEY_CURRENT_USER_MENU);
            }
            return val;
        };

        //清除session
        service.clearSessionData = function () {
            //service.delSession(service.SESSION_KEY_API_BASE_URL);
            service.delSession(service.SESSION_KEY_CURRENT_USER);
            service.delSession(service.SESSION_KEY_CURRENT_USER_MENU);
            service.delSession(service.SESSION_KEY_CURRENT_USER_PERMISSION);
        };

        service.wait = function () {
            angular.element("#wi-div-waiting").toggle();
        };
        /*--------------------- Session ----------------------------*/

        //Session
        service.setSession = function (key, val) {
            $cookieStore.put(key, val);
        };

        service.getSession = function (key) {
            return $cookieStore.get(key);
        };

        service.delSession = function (key) {
            $cookieStore.remove(key);
        };

        /*--------------------- Session ----------------------------*/

        return service;
    });
    //http服务
    services.factory('httpService', function ($http, commonService, authService) {
        var service = {};

        function getPostUrl(api, action, url) {
            var result = '';
            if (url == null || url == '') {
                result = commonService.getAPIDefaultUrl();
            } else {
                result = url;
            }
            if (result == null) {
                result = "";
            }
            result += '/' + api;
            if (action != null && action != '') {
                result += '/' + action;
            }
            return result;
        };

        var startWaiting = function () {
            //开启等待
            commonService.wait();
        };

        var EndWaiting = function (result) {
            //结束等待
            result.success(function (result, status, headers, config) {
                commonService.wait();
            }).error(function () {
                commonService.wait();
            });
        };

        function paramfn(data) {
            var str = "";
            angular.forEach(data, function (value, key) {
                str += str + "&" + key + "=" + value
            });
            str = str.substring(1);
            return str;
        };

        service.doPostToken = function (api, action, param, url) {
            var result = {};
            var url = getPostUrl(api, action, url);

            try {
                if (!param) {
                    param = {};
                }

                var token = ft.__RequestVerificationToken.value;
                param["__RequestVerificationToken"] = token;

            } catch (e) {

            }
            //生成参数
            param = paramfn(param);

            result = $http({
                method: 'POST',
                url: url,
                data: param,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                //timeout: 500
            });

            return result;
        };

        return service;
    });
    //登入登出服务
    services.factory('loginService', function (httpService) {
        var service = {};
        var api = 'Login';

        //登入
        service.signin = function (account, pwd) {
            //var param = { Account: account, Password: pwd };
            var param = { name: "tg" };
            return httpService.doPostToken("PPPartner", "Login", param);
        };

        //登出
        service.signout = function () {
            return httpService.doPostToken("Home", "CancelBinding", null);
        };

        return service;
    });

    return services;
});