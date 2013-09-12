modules.define(
    'navigation',
    [
        'i-bem__dom',
        'jquery',
        'bh',
        'utils__date'
    ],
    function (
        provide,
        DOM,
        $,
        bh,
        dateUtils
    ) {

    function formatTitle(time) {
        var date = new Date(time);
        var monthName = dateUtils.getMonthName(date.getMonth());
        var year = date.getFullYear();
        return monthName + ' ' + year;
    }

    /**
     * Navigation
     * @augments IBemView
     */
    provide(DOM.decl('navigation', {
        onSetMod: {
            js: {
                inited: function () {
                    this.findBlockOn(this.elem('left'), 'button').on('click', this._onPrevClick, this);
                    this.findBlockOn(this.elem('right'), 'button').on('click', this._onNextClick, this);
                    this.findBlockOn(this.elem('today'), 'button').on('click', this._onCurrentClick, this);
                },
                '': function () {
                    this.__base.apply(this, arguments);
                    this._model.un('change:currentDate', this.update, this);
                    this._model = null;
                }
            }
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

        getModel: function () {
            return this._model;
        },

        setModel: function (model) {
            this._model = model;
            this.update();
            this._model.on('change:currentDate', this.update, this);
        },

        update: function () {
            var title = formatTitle(this._model.get('currentDate'));
            DOM.update(this.elem('title'), title);
        }
    }, {
        create: function (model, options) {
            var bemjson = this.getBEMJSON(model, options);
            var block = DOM.init($(bh.apply(bemjson))).bem(this.getName());
            block.setModel(model);
            return block;
        },

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
