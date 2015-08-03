'use strict'
define(['angular'], function (services) {
    var baseService = angular.module('baseServiceModule', []);

    baseService.factory('commonService', function ($window, $cookieStore, $timeout) {
        var service = {};
        service.add = function (a) {
            return a + 1;
        };
        return service;
    });
});