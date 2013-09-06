modules.define('popup', ['i-bem__dom', 'jquery', 'bh'], function (provide, DOM, $, bh) {

    var TAIL_SIZE = 14;

    provide(DOM.decl('popup', {
        onSetMod: {
            js: {
                inited: function () {
                    this._direction = this.params.direction || 'bottom';
                    this.bindTo(this.elem('close'), 'click', this.hide, this);
                }
            }
        },

        destruct: function () {
            this.__base.apply(this, arguments);
            $(document).unbind('click', $.proxy(this._onDocumentClick, this));
            this.hide();
        },

        show: function (targetNode) {
            this._targetNode = targetNode;
            this.domElem.appendTo('body');
            this._updatePosition();
        },

        hide: function () {
            this.domElem.offset({
                top: -10000,
                left: -10000
            });
        },

        isShown: function () {
            var offset = this.domElem.offset();
            return offset.top !== -10000 && offset.left !== -10000;
        },

        _updatePosition: function () {
            var direction = this._getDirection();
            this.setMod('direction', direction);
            var offset = this._getOffset(direction);
            this.domElem.css(offset);
        },

        _getDirection: function () {
            var domElem = this.domElem;
            var popupWidth = domElem.outerWidth();
            var popupHeight = domElem.outerHeight();

            var targetNode = this._targetNode;
            var targetOffset = targetNode.offset();
            var targetWidth = targetNode.outerWidth();
            var targetHeight = targetNode.outerHeight();

            var win = $(window);
            var windowWidth = win.width();
            var windowHeight = win.height();
            var windowScrollTop = win.scrollTop();
            var windowScrollLeft = win.scrollLeft();

            // FIXME: Left and right position don't handle window height
            var directions = [
                targetOffset.left + popupWidth + targetWidth + TAIL_SIZE + windowScrollLeft < windowWidth && 'right',
                targetOffset.left - popupWidth - TAIL_SIZE > 0 && 'left',
                targetOffset.top + popupHeight + targetHeight + TAIL_SIZE < windowHeight && 'bottom',
                targetOffset.top - popupHeight - TAIL_SIZE - windowScrollTop > 0 && 'top'
            ].filter(Boolean);

            return !directions.length || $.inArray(this._direction, directions) !== -1 ?
                this._direction :
                directions[0];
        },

        _getOffset: function (direction) {
            var domElem = this.domElem;

            var popupWidth = domElem.outerWidth();
            var popupHeight = domElem.outerHeight();

            var targetNode = this._targetNode;
            var targetOffset = targetNode.offset();
            var targetWidth = targetNode.outerWidth();
            var targetHeight = targetNode.outerHeight();

            switch (direction) {
                case 'left':
                    return {
                        top: targetOffset.top + targetHeight / 2 - popupHeight / 2,
                        left: targetOffset.left - popupWidth - TAIL_SIZE
                    };
                case 'right':
                    return {
                        top: targetOffset.top + targetHeight / 2 - popupHeight / 2,
                        left: targetOffset.left + targetWidth + TAIL_SIZE
                    };
                case 'top':
                    return {
                        top: targetOffset.top - popupHeight - TAIL_SIZE,
                        left: targetOffset.left + targetWidth / 2 - popupWidth / 2
                    };
                case 'bottom':
                    return {
                        top: targetOffset.top + targetHeight + TAIL_SIZE,
                        left: targetOffset.left + targetWidth / 2 - popupWidth / 2
                    };
            }
        },

        setContent: function (content) {
            this.hide();
            DOM.update(this.findElem('content'), content.domElem);
            if (this._targetNode) {
                this._updatePosition();
            }
        }
    }, {
        create: function (options) {
            return DOM.init($(bh.apply({
                block: 'popup',
                mods: {
                    'has-close': 'yes'
                },
                js: {
                    direction: options.direction
                },
                content: {
                    elem: 'content',
                    content: options.content
                }
            }))).bem(this.getName());
        }
    }));

});
