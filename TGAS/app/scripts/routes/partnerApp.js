'use strict';

define(['angular'], function (angular) {
    return angular.module('pApp', ['partnerCtrls', 'authCtrls', 'ngRoute', 'ngCookies', 'ngTouch']);
});