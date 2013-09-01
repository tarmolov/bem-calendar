modules.define('navigation', ['i-bem__dom', 'jquery', 'bh', 'utils__date'], function (provide, DOM, $, bh, dateUtils) {

    function formatTitle(date) {
        var monthName = dateUtils.getMonthName(date.getMonth());
        var year = date.getFullYear();
        return monthName + ' ' + year;
    }

    provide(DOM.decl('navigation', {}, {
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
