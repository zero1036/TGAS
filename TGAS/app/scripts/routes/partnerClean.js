var fs = require('fs');
var CleanCSS = require('clean-css');

function cssMinifier(flieIn, fileOut) {
    var flieIn = Array.isArray(flieIn) ? flieIn : [flieIn];
    var origCode, finalCode = '';
    for (var i = 0; i < flieIn.length; i++) {
        origCode = fs.readFileSync(flieIn[i], 'utf8');
        var minified = new CleanCSS().minify(origCode).styles
        finalCode += minified;
    }
    fs.writeFileSync(fileOut, finalCode, 'utf8');
}

cssMinifier([
    'styles/common/base.css',
    'styles/common/animations.css',
    'styles/common/weixin-grid.css',
    'styles/common/weixin-icon.css',
    'styles/common/weixin-panel.css',
    'styles/common/weixin-alert.css'
], 'styles/build/partnerClean.css');

cssMinifier([
'styles/partner/partnermain.css'
], 'styles/build/partnermain.css');
