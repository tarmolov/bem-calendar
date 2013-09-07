modules.define('navigation', ['i-bem__dom', 'jquery', 'bh', 'utils__date'], function (provide, DOM, $, bh, dateUtils) {

    function formatTitle(time) {
        var date = time ? new Date(time) : new Date();
        var monthName = dateUtils.getMonthName(date.getMonth());
        var year = date.getFullYear();
        return monthName + ' ' + year;
    }

    provide(DOM.decl('navigation', {
        onSetMod: {
            js: {
                inited: function () {
                    this.findBlockOn(this.elem('left'), 'button').on('click', this._onPrevClick, this);
                    this.findBlockOn(this.elem('right'), 'button').on('click', this._onNextClick, this);
                    this.findBlockOn(this.elem('today'), 'button').on('click', this._onCurrentClick, this);
                }
            }
        },

        destruct: function () {
            this.__base.apply(this, arguments);

            this._model.un('change:currentDate', this.update, this);
            this._model = null;
        },

        _onPrevClick: function () {
            var currentDate = new Date(this._model.get('currentDate'));
            currentDate.setMonth(currentDate.getMonth() - 1);
            this._model.set('currentDate', currentDate.getTime());
        },

        _onNextClick: function () {
            var currentDate = new Date(this._model.get('currentDate'));
            currentDate.setMonth(currentDate.getMonth() + 1);
            this._model.set('currentDate', currentDate.getTime());
        },

        _onCurrentClick: function () {
            this._model.set('currentDate', new Date().getTime());
        },

        update: function () {
            var title = formatTitle(this._model.get('currentDate'));
            DOM.update(this.elem('title'), title);
        },

        _setModel: function (model) {
            this._model = model;
            this._model.on('change:currentDate', this.update, this);
            this.update();
        }

    }, {
        create: function (model) {
            var block = DOM.init($(bh.apply({
                block: 'navigation',
                content: [
                    {
                        block: 'button',
                        mods: {theme: 'shadow'},
                        mix: [{block: 'navigation', elem: 'left'}]
                    },
                    {
                        elem: 'title'
                    },
                    {
                        block: 'button',
                        mods: {theme: 'shadow'},
                        mix: [{block: 'navigation', elem: 'right'}]
                    },
                    {
                        block: 'button',
                        mods: {theme: 'shadow'},
                        mix: [{block: 'navigation', elem: 'today'}],
                        content: 'Today'
                    }
                ]
            }))).bem(this.getName());
            block._setModel(model);
            return block;
        }
    }));

});
