define(['angular'], function (angular) {
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
    return pdirectives;
});
