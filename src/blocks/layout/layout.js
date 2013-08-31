modules.define(
    'layout',
    [
        'i-bem__dom',
        'jquery',
        'bh',
        'head',
        'main'
    ],
    function (
        provide,
        DOM,
        $,
        bh,
        head,
        main
    ) {

    provide(DOM.decl('layout', {
    }, {
        create: function () {
            var html = bh.apply(this.getBEMJSON());
            return DOM.init($(html)).bem(this.getName());
        },

        getBEMJSON: function () {
            return {
                block: 'layout',
                content: [
                    head.getBEMJSON(),
                    main.getBEMJSON()
                ]
            };
        }
    }));

});
