'use strict';

define(['angular', 'meloading'], function (angular, meloading) {
    return angular.module('pApp', ['partnerCtrls', 'authCtrls', 'ngRoute', 'ngCookies', 'ngTouch', 'me-pageloading']);
});