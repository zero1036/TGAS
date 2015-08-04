
define(['angular', '../services/commonService', '../services/partnerService'], function (angular) {
    var ctrl = angular.module('partnerCtrls', ['baseServiceModule', 'partnerServiceModule']);

    ctrl.controller('partnerCtrl', ['$scope', '$cookieStore', '$http', 'commonService', 'partnerService', function ($scope, $cookieStore, $http, commonService, partnerService) {

        $scope.add = function () {
            //$cookieStore.put('user', { name: "tg" });

            var token = $cookieStore.get('token');

            $http.post("/api/Values/yel?token=" + 123).success(function (data) {
                try {
                    if (data.IsSuccess !== undefined && data.IsSuccess !== null && data.IsSuccess == false) {
                        alert(data.Message);
                    }
                    else {
                        $scope.menus = data;
                    }
                }
                catch (ex) { }
            });
        };

        $scope.name = partnerService.getPartner(9);
    }]);
});
