require.config({
    paths: {
        underscore: '../vendor/underscore.min',
        zepto: '../vendor/zepto.min',
        backbone: '../vendor/backbone.min',
        domReady: '../vendor/domReady',
        // iscroll
        iscroll: '../vendor/iscroll/iscroll'
    },
    shim: {
        underscore: {
            //deps: ['jquery'],
            exports: 'underscore'
        },
        zepto: {
            exports: 'zepto'
        },
        backbone: {
            deps: ['underscore', 'zepto']
        }
    },
    waitSeconds: 0
});
require([
	'zepto',
	'backbone',
	'domReady'
],
function ($, backbone, domReady) {

    var CustRoute = Backbone.Router.extend({
        initialize: function () {
            console.log("Route initialize");
        },
        routes: {
            "home": "helpex"
        },
        helpex: function () {
            console.log("helpex");
        }
    });

    new CustRoute();
    Backbone.history.start();
    //domReady
    domReady(function () {
        var loading = document.getElementById("wi-div-waiting");
        loading.style.display = "none";
    });
});

