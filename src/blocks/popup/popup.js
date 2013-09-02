modules.define('popup', ['i-bem__dom', 'jquery', 'bh'], function (provide, DOM, $, bh) {

    var TAIL_SIZE = [14, 14];

    provide(DOM.decl('popup', {
        onSetMod: {
            js: {
                inited: function () {
                    this._direction = this.params.direction || 'bottom';
                    this.bindTo('click', this._onClick, this);
                    this.bindTo(this.elem('close'), 'click', this._onCloseClick, this);
                    $(document).bind('click', $.proxy(this.hide, this));
                }
            }
        },

        destruct: function () {
            this.__base.apply(this, arguments);
            $(document).unbind('click', $.proxy(this.hide, this));
            this.domElem.remove();
        },

        _onClick: function (e) {
            e.stopPropagation();
        },

        _onCloseClick: function (e) {
            this.hide();
            e.stopPropagation();
        },

        show: function (domNode) {
            $(domNode).append(this.domElem);
            this._direction = this._getDirection(domNode);
            this.setMod('direction', this._direction);
            this._pos(this._calculateOffset());
        },

        hide: function () {
            this.destruct();
        },

        _getDirection: function (domNode) {
            var popupSize = this._getPopupSize();
            var offset = domNode.offset();

            var availableDirections = [];
            if (offset.left + popupSize[0] + domNode.outerWidth() < window.innerWidth) {
                availableDirections.push('right');
            }
            if (offset.left - popupSize[0] > 0) {
                availableDirections.push('left');
            }
            if (offset.top + popupSize[1] + domNode.outerWidth() < window.innerHeight) {
                availableDirections.push('bottom');
            }
            if (offset.top - popupSize[1] > 0) {
                availableDirections.push('top');
            }
            return $.inArray(this._direction, availableDirections) !== -1 ?
                this._direction :
                availableDirections[0];
        },

        _getPopupSize: function () {
            return [
                this.domElem.outerWidth() + TAIL_SIZE[0],
                this.domElem.outerHeight() + TAIL_SIZE[1]
            ];
        },

        _pos: function (offsetValue) {
            var offset = {};
            offset[this._direction] = offsetValue;
            this.elem('content').css('width', this.elem('content').width());
            this.domElem.css(offset);
        },

        _calculateOffset: function () {
            var popupSize = this._getPopupSize();

            switch (this._direction) {
                case 'left':
                case 'right':
                    return -popupSize[0] + 'px';
                case 'top':
                case 'bottom':
                    return -popupSize[1] + 'px';
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
