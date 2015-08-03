
define(['angular', '../services/commonService', '../services/partnerService'], function (angular) {
    var ctrl = angular.module('partnerCtrls', ['baseServiceModule', 'partnerServiceModule']);

    ctrl.controller('partnerCtrl', ['$scope', 'commonService', 'partnerService', function ($scope, commonService, partnerService) {

        $scope.name = partnerService.getPartner(9);
    }]);
});
