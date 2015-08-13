require.config({
    //baseUrl: "scripts/vendor",
    paths: {
        underscore: '../vendor/underscore.min',
        zepto: '../vendor/zepto.min',
        backbone: '../vendor/backbone.min',
        domReady: '../vendor/domReady',
        iscroll: '../vendor/iscroll/iscroll'
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
	'domReady'
],
function ($, _, backbone, domReady) {
       

    var HomeView = Backbone.View.extend({
        el: $("#view"),  //在哪里显示
        template: {},  //获取模板 模板是用Mustache
        initialize: function (options) {
            //this.options = options;
            //this.bind('change', this.render);
            //this.model = this.options.model;
        },
        render: function () { // render方法，目标只有两个：填充this.el，返回this以便链式操作。
            //$(this.el).html(this.template);
            this.el[0].innerHTML = this.template;
            return this;
        }
    });

    var YjdetailsView = Backbone.View.extend({
        el: $("#view"),  //在哪里显示
        template: {},  //获取模板 模板是用Mustache
        initialize: function (options) {
            //this.options = options;
            //this.bind('change', this.render);
            //this.model = this.options.model;
        },
        render: function () { // render方法，目标只有两个：填充this.el，返回this以便链式操作。
            //$(this.el).html(this.template);
            this.el[0].innerHTML = this.template;
            return this;
        }
    });

    var YjincreaseView = Backbone.View.extend({
        el: $("#view"),  //在哪里显示
        template: {},  //获取模板 模板是用Mustache
        initialize: function (options) {
            //this.options = options;
            //this.bind('change', this.render);
            //this.model = this.options.model;
        },
        render: function () { // render方法，目标只有两个：填充this.el，返回this以便链式操作。
            //$(this.el).html(this.template);
            this.el[0].innerHTML = this.template;
            return this;
        }
    });

    //var detail = new Detail(this.interface);
    var homeView = new HomeView(this.interface);
    var yjdetailsView = new YjdetailsView(this.interface);
    var yjincreaseView = new YjincreaseView(this.interface);

    function getView(view, url) {

        if (typeof view.template === "string") {
            view.render();
        }
        else {
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                dataType: 'html',
                //data: { "isGoldenRuleVerify": 1 },
                success: function (data) {
                    view.template = data;
                    view.render();
                }
            });
        }
    }

    var App = Backbone.Router.extend({
        routes: {
            "/": "home",    // #index
            "/home": "homeAct",    // #index
            "/yjdetails": "yjdetailsAct",   // #detail
            "/yjincrease": "yjincreaseAct"    // #detail
        },
        homeAct: function () {
            getView(homeView, "/app/views/partner/home.html");
        },
        yjdetailsAct: function () {
            getView(yjdetailsView, "/app/views/partner/yjdetails.html");
        },
        yjincreaseAct: function () {
            getView(yjincreaseView, "/app/views/partner/yjincrease.html");
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

