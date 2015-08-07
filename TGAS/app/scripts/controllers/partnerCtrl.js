
define(['angular', '../services/commonService', '../services/partnerService'], function (angular) {
    var ctrl = angular.module('partnerCtrls', ['baseServiceModule', 'partnerServiceModule']);

    ctrl.controller('partnerCtrl', ['$scope', '$cookieStore', '$location', 'commonService', 'httpService', 'partnerService', function ($scope, $cookieStore, $location, commonService, httpService, partnerService) {

        $scope.add = function () {
            httpService.doPostToken("PPPartner", 'test1', null).success(function (response) {
                console.log(response);
            }).error(function () {

            });
        };

    }]);

    return ctrl;
});
