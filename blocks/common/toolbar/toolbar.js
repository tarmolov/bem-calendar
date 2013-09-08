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

    /**
     * Left toolbar.
     * @augments IBemView
     */
    provide(DOM.decl('toolbar', {
        onSetMod: {
            js: {
                inited: function () {
                    this.findBlockInside('add', 'button').on('click', this._onAddClick, this);
                }
            }
        },

        destruct: function () {
            this.__base.apply(this, arguments);

            if (this._popup) {
                this._popup.destruct();
            }
        },

        _onAddClick: function (e) {
            if (this._popup) {
                this._popup.destruct();
            }
            this._popup = Popup.create({direction: 'bottom'});
            this._form = FormView.create('quick-event');
            this._form.on('create', this._onNewEvent, this);
            this._popup.setContent(this._form);
            this._popup.show(e.target.domElem);
        },

        _onNewEvent: function (e, model) {
            this._popup.hide();
            this.emit('create', model);
        },


        update: function () {},

        setModel: function (model) {
            this._model = model;
            this.update();
        },

        getModel: function () {
            return this._model;
        }
    }, {
        create: function (model) {
            var bemjson = this.getBEMJSON(model);
            var block = DOM.init($(bh.apply(bemjson))).bem(this.getName());
            block.setModel(model);

            return block;
        },

        getBEMJSON: function () {
            return {
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
            };
        }
    }));

});
