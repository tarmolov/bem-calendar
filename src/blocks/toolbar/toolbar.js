modules.define('toolbar', ['i-bem__dom', 'jquery', 'bh'], function (provide, DOM, $, bh) {

    provide(DOM.decl('toolbar', {}, {
        create: function () {
            return DOM.init($(bh.apply({
                block: 'toolbar',
                content: [
                    {
                        block: 'button',
                        mods: {
                            theme: 'blue'
                        },
                        mix: [
                            {block: 'toolbar', elem: 'button'}
                        ],
                        content: 'Add'
                    },
                    {
                        block: 'button',
                        mods: {
                            theme: 'blue'
                        },
                        mix: [
                            {block: 'toolbar', elem: 'button'}
                        ],
                        content: 'Update'
                    }
                ]
            }))).bem(this.getName());
        }
    }));

});
