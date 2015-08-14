define(['zepto', 'underscore', 'backbone'], function ($, _, backbone) {
    return {
        view: Backbone.View.extend({
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
        })
    };
});