modules.define(
    'event',
    [
        'i-bem__dom',
        'popup',
        'form_type_event'
    ],
    function (
        provide,
        DOM,
        Popup,
        FormEvent
    ) {

    /**
     * Calendar event
     * @mixin bemview
     */
    provide(DOM.decl('event', {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('click', this._onClick, this);
                }
            }
        },

        destruct: function () {
            this.__base.apply(this, arguments);
            this.__self.getPopup().hide();
            this._model.un('change', this.update, this);
        },

        _onClick: function (e) {
            e.stopPropagation();
            this.openPopup();
        },

        openPopup: function () {
            var popup = this.__self.getPopup();
            this._form = FormEvent.create(this._model, {type: 'event'});
            popup.setContent(this._form);
            popup.show(this.domElem);

            this._form.on('save', this._onSave, this);
            this._form.on('delete', this._onDelete, this);
        },

        closePopup: function () {
            this._form.destruct();
            this.__self.getPopup().hide();
        },

        _onSave: function () {
            this.closePopup();
        },

        _onDelete: function () {
            this.closePopup();
            this.emit('delete', this._model);
        },

        update: function () {
            this.__base.apply(this, arguments);
            this.elem('title').html(this._model.get('title'));
            this.elem('participants').html(this._model.get('participants'));
        },

        setModel: function () {
            if (this._model) {
                this._model.un('change', this.update, this);
            }
            this.__base.apply(this, arguments);
            this._model.on('change', this.update, this);
        }
    }, {
        getBEMJSON: function (model) {
            return {
                block: 'event',
                js: model.toJSON(),
                content: [
                    {elem: 'title'},
                    {elem: 'participants'}
                ]
            };
        },

        getPopup: function () {
            if (!this._popup) {
                this._popup = this._createPopup();
            }
            return this._popup;
        },

        _createPopup: function () {
            return Popup.create({
                direction: 'right'
            });
        }
    }));

});
