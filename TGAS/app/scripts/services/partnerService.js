//'use strict'
define(['angular', '../services/commonService'], function (angular) {
    var ps = angular.module('partnerServiceModule', ['baseServiceModule']);

    ps.factory('partnerService', function ($window, $cookieStore, $timeout, commonService) {
        var service = {};
        service.getPartner = function (a) {
            return commonService.add(a);
        };
        return service;
    });
});