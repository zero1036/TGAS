
define(['angular', '../services/commonService'], function (angular) {
    var ctrl = angular.module('authCtrls', ['baseServiceModule']);

    ctrl.controller('loginCtrl', ['$scope', '$location', 'loginService', function ($scope, $location, loginService) {
        $scope.login = function () {
            loginService.signin("15902050002", "504").success(function (data) {
                if (data.ok) {
                    if ($location.$$url == "") {
                        param = "#/home";
                    }
                    else {
                        //生成跳转参数
                        var param = $location.$$url
                            .replace(/redirect=/g, '')
                            .replace(/%2F/g, '/')
                        param = param.substring(1);
                    }

                    window.location.href = "#" + param;
                }
            }).error(function () {

            });
        };
    }]);

    return ctrl;
});
