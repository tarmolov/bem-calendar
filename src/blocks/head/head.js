modules.define('head', ['i-bem__dom'], function (provide, DOM) {

    provide(DOM.decl('head', {}, {
        getBEMJSON: function () {
            return {
                block: 'head',
                content: [
                    {elem: 'toolbar', mix: [{block: 'placeholder', mods: {id: 'toolbar'}}], content: [
                        {block: 'button', mods: {theme: 'blue'}, content: 'Add'},
                        {block: 'button', mods: {theme: 'blue'}, content: 'Update'}
                    ]},
                    {elem: 'search', content: [
                        {block: 'search', placeholder: 'Event, date, or participant'}
                    ]}
                ]
            };
        }
    }));

});
