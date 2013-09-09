modules.define(
    'toolbar',
    [
        'i-bem__dom',
        'popup',
        'form_type_quick-event'
    ],
    function (
        provide,
        DOM,
        Popup,
        FormView
    ) {

    /**
     * Left toolbar.
     * @mixin bemview
     */
    provide(DOM.decl('toolbar', {
        onSetMod: {
            js: {
                inited: function () {
                    this.findBlockInside('add', 'button').on('click', this._onAddClick, this);
                    this.findBlockInside('update', 'button').on('click', this._onUpdateClick, this);
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
        }
    }, {
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
