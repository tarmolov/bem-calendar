modules.define(
    'popup',
    [
        'i-bem__dom',
        'jquery',
        'bh'
    ],
    function (
        provide,
        DOM,
        $,
        bh
    ) {

    var TAIL_SIZE = 14;

    provide(DOM.decl('popup', {
        onSetMod: {
            js: {
                inited: function () {
                    // IE sets position=relative for popup
                    // Maybe similar to http://bugs.jquery.com/ticket/6949
                    this.domElem.css('position', 'absolute');
                    this._direction = this.params.direction || 'bottom';
                    this.bindTo(this.elem('close'), 'click', this.hide, this);
                },
                '': function () {
                    this.__base.apply(this, arguments);
                    this.hide();
                }
            }
        },

        /**
         * Shows popup
         * @param {jQuery} targetNode A html node when popup should be shown
         */
        show: function (targetNode) {
            var isShown = this.isShown();

            this._targetNode = targetNode;
            this.domElem.appendTo('body');
            this._updatePosition();

            if (!isShown) {
                this.trigger('show');
            }
        },

        /**
         * Hides popup
         */
        hide: function () {
            var isShown = this.isShown();

            this.domElem.offset({
                top: -10000,
                left: -10000
            });

            if (isShown) {
                this.trigger('hide');
            }
        },

        /**
         * Returns current visiblity of popup
         * @returns {Boolean} isShown
         */
        isShown: function () {
            var offset = this.domElem.offset();
            return offset.top !== -10000 && offset.left !== -10000;
        },

        /**
         * Repositions popup
         */
        _updatePosition: function () {
            var direction = this._getDirection();
            this.setMod('direction', direction);
            var offset = this._getOffset(direction);
            this.domElem.offset(offset);
        },

        /**
         * Returns popup directon
         * Uses specified direction or any available
         * @returns {String} direction
         */
        _getDirection: function () {
            var domElem = this.domElem;
            var popupWidth = domElem.outerWidth();
            var popupHeight = domElem.outerHeight();

            var targetNode = this._targetNode;
            var targetOffset = targetNode.offset();
            var targetWidth = targetNode.outerWidth();
            var targetHeight = targetNode.outerHeight();

            var win = this.__self.win;
            var windowWidth = win.width();
            var windowHeight = win.height();

            var directions = [
                targetOffset.left + popupWidth + targetWidth + TAIL_SIZE < windowWidth && 'right',
                targetOffset.left - popupWidth - TAIL_SIZE > 0 && 'left',
                targetOffset.top + popupHeight + targetHeight + TAIL_SIZE < windowHeight && 'bottom',
                targetOffset.top - popupHeight - TAIL_SIZE > 0 && 'top'
            ].filter(Boolean);

            return !directions.length || $.inArray(this._direction, directions) !== -1 ?
                this._direction :
                directions[0];
        },

        /**
         * Returns popup offset
         * @param {String} direction
         * @returns {Object} offset
         */
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
                        top: targetOffset.top - TAIL_SIZE,
                        left: targetOffset.left - popupWidth - TAIL_SIZE
                    };
                case 'right':
                    return {
                        top: targetOffset.top - TAIL_SIZE,
                        left: targetOffset.left + targetWidth + TAIL_SIZE
                    };
                case 'top':
                    return {
                        top: targetOffset.top - popupHeight - TAIL_SIZE,
                        left: targetOffset.left - TAIL_SIZE
                    };
                case 'bottom':
                    return {
                        top: targetOffset.top + targetHeight + TAIL_SIZE,
                        left: targetOffset.left - TAIL_SIZE
                    };
            }
        },

        /**
         * Sets popup content
         * @param {BEMDOM|String} content
         */
        setContent: function (content) {
            this.hide();
            DOM.update(
                this.findElem('content'),
                typeof content === 'string' ?
                    content :
                    content.domElem
            );
            if (this._targetNode) {
                this._updatePosition();
            }
        }
    }, {
        create: function (options) {
            var bemjson = this.getBEMJSON(options);
            return DOM.init($(bh.apply(bemjson))).bem(this.getName());
        },

        getBEMJSON: function (options) {
            return {
                block: 'popup',
                js: {
                    direction: options.direction
                },
                content: {
                    elem: 'content',
                    content: options.content
                }
            };
        }
    }));

});
