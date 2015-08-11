define(['angular', '../directives/tsb'], function (angular, tsb) {
    var pdirectives = angular.module('directives', []);
    pdirectives.directive("articledisplay", function () {
        return {
            /*restrict的取值范围:
             *E - 表示创建的是一个HTML标签: <custom-tag></custom-tag>
             *A - 为HTML标签创建属性: <div my-directive="exp"> </div>
             *C - 为HTML标签创建类: <div class="my-directive: exp;"></div>
             *M - 创建HTML注释: <!-- directive: my-directive exp -->
            */
            restrict: "E",
            /*replace为true时模块则覆盖标签，比如模块是:<div></div>，
             *则<customTag></customTag>最终解释为<div></div>
            */
            replace: true,
            /*模块，即把<customTag>映射成最终什么样的HTML代码*/
            templateUrl: 'views/matter/articleDisplay.html'
        }
    });
    //等待视图
    pdirectives.directive("waitingView", function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'views/sys/waiting.html'
        }
    });
    //wa主框架视图
    pdirectives.directive("wanavview", function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'views/Sys/waNavView.html'
        }
    });
    //
    pdirectives.directive("waSlide", function () {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, el, attrs, ngModel) {
                //el.on('blur', function () {
                //    if (ngModel.$modelValue == undefined || ngModel.$modelValue == null) return;

                //    if (ngModel.$modelValue.length != 11) {
                //        el.addClass("error");
                //    }
                //    else {
                //        el.removeClass("error");
                //    }
                //});
                myScroll = new iScroll(el[0]);

                var ts = tsb.ts;
                new ts({
                    outer: el[0]
                });
            }
        };
    });
    return pdirectives;
});



