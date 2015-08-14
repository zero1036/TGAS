require.config({
    //baseUrl: "scripts/vendor",
    paths: {
        underscore: '../vendor/underscore.min',
        zepto: '../vendor/zepto.min',
        backbone: '../vendor/backbone.min',
        domReady: '../vendor/domReady',
        template: '../vendor/template',
        iscroll: '../vendor/iscroll/iscroll',
        common: '../common/common'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        zepto: {
            exports: '$'
        },
        backbone: {
            deps: ['underscore', 'zepto'],
            exports: 'Backbone'
        }
    },
    waitSeconds: 0
});
require([
	'zepto',
    'underscore',
    'backbone',
	'domReady',
    'common',
    '../controller/homeCtrl',
    '../controller/yjdetailsCtrl',
    '../controller/yjincreaseCtrl'
],
function ($, _, backbone, domReady, common, homeCtrl, yjdetailsCtrl, yjincreaseCtrl) {



    //var detail = new Detail(this.interface);
    var homeView = new homeCtrl.view(this.interface);
    var yjdetailsView = new yjdetailsCtrl.view(this.interface);
    var yjincreaseView = new yjincreaseCtrl.view(this.interface);



    var App = Backbone.Router.extend({
        routes: {
            "/": "home",    // #index
            "/home": "homeAct",    // #index
            "/yjdetails": "yjdetailsAct",   // #detail
            "/yjincrease": "yjincreaseAct"    // #detail
        },
        homeAct: function () {
            common.getView(homeView, "/app/views/partner/home.html");
        },
        yjdetailsAct: function () {
            common.getView(yjdetailsView, "/app/views/partner/yjdetails.html");
        },
        yjincreaseAct: function () {
            common.getView(yjincreaseView, "/app/views/partner/yjincrease.html");
        },
        initialize: function () {

        },
        interface: {
            forward: function (url) {
                window.location.href = ('#' + url).replace(/^#+/, '#');
                //window.location.href = ('#' + url);
            }
        }
    });

    var app = new App();
    Backbone.history.start();

    var s = '';


    //domReady
    domReady(function () {
        var loading = document.getElementById("wi-div-waiting");
        loading.style.display = "none";
    });
});

