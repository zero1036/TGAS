define(['angular', 'cookies', 'route', 'touch'], function (angular) {
    return angular.module('pApp', ['partnerCtrls', 'authCtrls', 'ngRoute', 'ngCookies', 'ngTouch', 'me-pageloading']);
});