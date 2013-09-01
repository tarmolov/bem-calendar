modules.define('popup', ['i-bem__dom', 'jquery', 'bh'], function (provide, DOM, $, bh) {

    var TAIL_SIZE = [14, 14];

    provide(DOM.decl('popup', {
        onSetMod: {
            js: {
                inited: function () {
                    this._direction = this.params.direction || 'bottom';
                }
            }
        },

        destruct: function () {
            this.__base.apply(arguments);
            this.domElem.remove();
        },

        show: function (domNode) {
            $(domNode).append(this.domElem);
            this._direction = this._getDirection(domNode);
            this.setMod('direction', this._direction);
            this._pos(this._calculateOffset());
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
                js: {
                    direction: options.direction
                },
                content: options.content
            }))).bem(this.getName());
        }
    }));

});
