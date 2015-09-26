require("../controller/controllers");
require("../service/services");
require("../directive/directives");

var app = angular.module('wxApp', ['ngRoute', 'services', 'directives', 'controllers']);

module.exports = app;