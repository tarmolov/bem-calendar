modules.define('navigation', ['i-bem__dom', 'jquery', 'bh', 'utils__date'], function (provide, DOM, $, bh, dateUtils) {

    function formatTitle(date) {
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

        _onPrevClick: function () {
            this.emit('prev');
        },

        _onNextClick: function () {
            this.emit('next');
        },

        _onCurrentClick: function () {
            this.emit('current');
        },

        setTitle: function (options) {
            DOM.update(this.elem('title'), formatTitle(options.currentDate));
        }
    }, {
        create: function (options) {
            return DOM.init($(bh.apply({
                block: 'navigation',
                content: [
                    {
                        block: 'button',
                        mods: {theme: 'shadow'},
                        mix: [{block: 'navigation', elem: 'left'}]
                    },
                    {
                        elem: 'title',
                        content: formatTitle(options.currentDate)
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
        }
    }));

});
