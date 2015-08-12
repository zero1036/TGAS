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

    //var Detail = Backbone.View.extend({
    //    el: $("#view"),  //在哪里显示
    //    template: {},  //获取模板 模板是用Mustache
    //    initialize: function (options) {
    //        this.options = options;
    //        this.bind('change', this.render);
    //        //this.model = this.options.model;
    //    },
    //    render: function () { // render方法，目标只有两个：填充this.el，返回this以便链式操作。
    //        //$(this.el).html(this.template);
    //        this.el[0].innerHTML = this.template;
    //        return this;
    //    }
    //});

    var Index = Backbone.View.extend({
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

    //var Index = Backbone.View.extend({
    //    el: {},
    //    template: {},
    //    detail: {},
    //    initialize: function (app) {
    //        this.app = app;

    //        ////先生成框架html
    //        //this.$el.html(this.template());
    //        //this.post = this.$('#post');

    //        //var scope = this;
    //        //var curpage = 1;
    //        //var pageSize = 10;
    //        //this.list = new PostList();
    //        //this.list.url = 'Handler.ashx?url=http://wcf.open.cnblogs.com/blog/sitehome/paged/' + curpage + '/' + pageSize;
    //        //this.list.fetch({
    //        //    success: function () {
    //        //        scope.render();
    //        //    }
    //        //});
    //        //this.wrapper = $('#lstbox');

    //        //this.listenTo(this.list, 'all', this.render);

    //    },
    //    render: function () {

    //        var models = this.list.models;
    //        var html = '';
    //        for (var i = 0, len = models.length; i < len; i++) {
    //            models[i].index = i;
    //            html += this.itemTmpt(_.extend(models[i].toJSON(), { index: i }));
    //        }
    //        this.wrapper.html(html);
    //        var s = '';
    //    }
    //});

    //var detail = new Detail(this.interface);
    var index = new Index(this.interface);

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
            "": "detail",    // #index
            "home": "index",    // #index
            "yjdetails": "detail"    // #detail
        },
        index: function () {
            getView(index, "/app/views/partner/home.html");
        },
        detail: function () {
            getView(index, "/app/views/partner/yjdetails.html");
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

