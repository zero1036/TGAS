define(['zepto', 'underscore', 'backbone', 'common'], function ($, _, backbone, common) {
    var user = Backbone.Model.extend({
        //initialize: function () {
        //    this.bind("change", this.changed);
        //},
        //changed: function () {
        //    alert("changed");
        //},
        defaults: {
            name: "tgor"
        }
    });
    var view = Backbone.View.extend({
        el: $("#view"),  //在哪里显示
        template: {},  //获取模板 模板是用Mustache
        model: new user(),
        events: {
            "click a.more": "moreInfo"
        },
        moreInfo: function (e) {
            console.log(e);
            this.model.set({
                name: "change name"
            });
        },
        initialize: function (options) {
            //this.options = options;
            this.bind('change', this.render);
            this.model.bind("change", this.render, this);
            //this.model = this.options.model;
        },
        render: function () { // render方法，目标只有两个：填充this.el，返回this以便链式操作。
            //$(this.el).html(this.template);
            console.log(this.model.get("name"));

            var str = common.template(this.template, this.model.toJSON());

            this.el[0].innerHTML = str;
            return this;
        }
    });




    return {
        model: user,
        view: view
    };
});