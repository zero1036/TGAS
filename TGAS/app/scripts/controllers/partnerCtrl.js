
define(['angular', '../services/commonService', '../services/partnerService'], function (angular) {
    var ctrl = angular.module('partnerCtrls', ['baseServiceModule', 'partnerServiceModule']);

    ctrl.controller('partnerCtrl', ['$scope', '$cookieStore', 'commonService', 'partnerService', function ($scope, $cookieStore, commonService, partnerService) {

        $scope.add = function () {
            $cookieStore.put('user', { name: "tg" });
        };

        $scope.name = partnerService.getPartner(9);
    }]);
});
