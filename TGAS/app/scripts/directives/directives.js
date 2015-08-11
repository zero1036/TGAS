define(['angular', '../directives/tsb'], function (angular, tsb) {
    var pdirectives = angular.module('directives', []);
    pdirectives.directive("articledisplay", function () {
        return {
            /*restrict��ȡֵ��Χ:
             *E - ��ʾ��������һ��HTML��ǩ: <custom-tag></custom-tag>
             *A - ΪHTML��ǩ��������: <div my-directive="exp"> </div>
             *C - ΪHTML��ǩ������: <div class="my-directive: exp;"></div>
             *M - ����HTMLע��: <!-- directive: my-directive exp -->
            */
            restrict: "E",
            /*replaceΪtrueʱģ���򸲸Ǳ�ǩ������ģ����:<div></div>��
             *��<customTag></customTag>���ս���Ϊ<div></div>
            */
            replace: true,
            /*ģ�飬����<customTag>ӳ�������ʲô����HTML����*/
            templateUrl: 'views/matter/articleDisplay.html'
        }
    });
    //�ȴ���ͼ
    pdirectives.directive("waitingView", function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'views/sys/waiting.html'
        }
    });
    //wa�������ͼ
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



