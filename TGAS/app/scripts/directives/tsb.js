define(function () {
    var ts = function (opts) {
        this.outer = opts.outer;
        this._bindHandler();
    };

    ts.prototype._bindHandler = function () {
        var outer = this.outer;
        var device = this._device();
        if (!device.hasTouch) {
            outer.style.cursor = 'pointer';
            outer.ondragstart = function (evt) {
                if (evt) {
                    return false;
                }
                return true;
            };
        }
        outer.addEventListener(device.startEvt, this);
        outer.addEventListener(device.moveEvt, this);
        outer.addEventListener(device.endEvt, this);
        window.addEventListener('orientationchange', this);
    };
    ts.prototype.handleEvent = function (evt) {
        var device = this._device();
        switch (evt.type) {
            case device.startEvt:
                //this.startHandler(evt);
                console.log("start:"+this.outer.id)
                break;
            case device.moveEvt:
                //this.moveHandler(evt);
                break;
            case device.endEvt:
                //this.endHandler(evt);
                console.log("end")
                break;
            case 'touchcancel':
                //this.endHandler(evt);
                break;
            case 'orientationchange':
                //this.orientationchangeHandler();
                break;
            case 'focus':
                //this.isAutoplay && this.play();
                break;
            case 'blur':
                //this.pause();
                break;
        }
    };

    ts.prototype._device = function () {
        var hasTouch = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
        var startEvt = hasTouch ? 'touchstart' : 'mousedown';
        var moveEvt = hasTouch ? 'touchmove' : 'mousemove';
        var endEvt = hasTouch ? 'touchend' : 'mouseup';
        return {
            hasTouch: hasTouch,
            startEvt: startEvt,
            moveEvt: moveEvt,
            endEvt: endEvt
        };
    };
    return {
        ts: ts
    };
});