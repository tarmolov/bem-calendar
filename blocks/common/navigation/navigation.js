modules.define('navigation', ['i-bem__dom', 'utils__date'], function (provide, DOM, dateUtils) {

    function formatTitle(time) {
        var date = new Date(time);
        var monthName = dateUtils.getMonthName(date.getMonth());
        var year = date.getFullYear();
        return monthName + ' ' + year;
    }

    /**
     * Navigation
     * @mixin bemview
     */
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
            this.__base.apply(this, arguments);
            var title = formatTitle(this._model.get('currentDate'));
            DOM.update(this.elem('title'), title);
        },

        setModel: function () {
            this.__base.apply(this, arguments);
            this._model.on('change:currentDate', this.update, this);
        }
    }, {
        getBEMJSON: function () {
            return {
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
            };
        }
    }));

});
