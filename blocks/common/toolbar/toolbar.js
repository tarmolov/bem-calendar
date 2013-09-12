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
                    this.findBlockInside('update', 'button').on('click', this._onUpdateClick, this);
                },
                '': function () {
                    this.__base.apply(this, arguments);
                    this._removePopup();
                }
            }
        },

        _onAddClick: function (e) {
            this._removePopup();
            this._popup = Popup.create({direction: 'bottom'});
            this._form = FormView.create(null, {type: 'quick-event'});
            this._form.on('create', this._onNewEvent, this);
            this._popup.setContent(this._form);
            this._popup.show(e.target.domElem);
        },

        _onUpdateClick: function () {
            this.emit('update');
        },

        _onNewEvent: function (e, model) {
            this._popup.hide();
            this.emit('create', model);
        },

        _removePopup: function () {
            if (this._popup) {
                DOM.destruct(this._popup.domElem);
            }
        },

        update: function () {},

        getModel: function () {
            return this._model;
        },

        setModel: function (model) {
            this._model = model;
            this.update();
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
