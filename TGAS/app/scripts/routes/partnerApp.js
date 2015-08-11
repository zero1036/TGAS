define(['angular', 'cookies', 'route', 'touch', 'animate'], function (angular) {
    return angular.module('pApp', ['ngRoute', 'ngCookies', 'ngTouch', 'ngAnimate', 'partnerCtrls', 'authCtrls']);
});