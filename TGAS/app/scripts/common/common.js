define(['zepto', 'underscore', 'template'], function ($, _, template) {
    return {
        template: function temp(source, model) {
            var render = template.compile(source);
            return html = render(model);
        },
        //
        getView: function (view, url) {
            if (typeof view.template === "string") {
                view.render();
            }
            else {
                $.ajax({
                    type: 'GET',
                    url: url,
                    async: true,
                    dataType: 'html',
                    success: function (data) {
                        view.template = data;
                        view.render();
                    }
                });
            }
        }
    };
});