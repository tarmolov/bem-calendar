modules.define(
    'toolbar',
    [
        'i-bem__dom',
        'jquery',
        'bh',
        'popup',
        'form_type_quick-event'
    ],
    function (
        provide,
        DOM,
        $,
        bh,
        Popup,
        FormView
    ) {

    provide(DOM.decl('toolbar', {
        onSetMod: {
            js: {
                inited: function () {
                    this.findBlockInside('add', 'button').on('click', function (e) {
                        this._popup = Popup.create({direction: 'bottom'});
                        this._form = FormView.create('quick-event');
                        this._form.on('create', this._onNewEvent, this);
                        this._popup.setContent(this._form);
                        this._popup.show(e.target.domElem);
                    }, this);
                }
            }
        },

        destruct: function () {
            this.__base.apply(this, arguments);
            this._popup.destruct();
        },

        _onNewEvent: function (e, model) {
            this._popup.hide();
            this.emit('create', model);
        },

        _setModel: function (model) {
            this._model = model;
        }
    }, {
        create: function (model) {
            var block = DOM.init($(bh.apply({
                block: 'toolbar',
                content: [
                    {
                        block: 'button',
                        mods: {
                            theme: 'blue'
                        },
                        mix: [
                            {block: 'toolbar', elem: 'add'}
                        ],
                        content: 'Add'
                    },
                    {
                        block: 'button',
                        mods: {
                            theme: 'blue'
                        },
                        mix: [
                            {block: 'toolbar', elem: 'update'}
                        ],
                        content: 'Update'
                    }
                ]
            }))).bem(this.getName());
            block._setModel(model);

            return block;
        }
    }));

});
