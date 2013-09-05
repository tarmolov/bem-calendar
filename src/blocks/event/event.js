modules.define(
    'event',
    [
        'i-bem__dom',
        'jquery',
        'bh',
        'popup',
        'form_type_event'
    ],
    function (
        provide,
        DOM,
        $,
        bh,
        Popup,
        FormEvent
    ) {

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
            this._model.un('change', this.update, this);
        },

        _onClick: function (e) {
            e.stopPropagation();
            this.openPopup();
        },

        openPopup: function () {
            var popup = this.__self.getPopup();
            this._form = FormEvent.create('event', this._model);
            popup.setContent(this._form);

            this._form.on('save', this._onSave, this);
            this._form.on('delete', this._onDelete, this);

            popup.show(this.domElem);
        },

        closePopup: function () {
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
            this.elem('title').html(this._model.get('title'));
            this.elem('participants').html(this._model.get('participants'));
        },

        _setModel: function (model) {
            if (this._model) {
                this._model.un('change', this.update, this);
            }
            this._model = model;
            this._model.on('change', this.update, this);
            this.update();
        }
    }, {
        create: function (model) {
            var bemjson = this.getBEMJSON(model);
            var block = DOM.init($(bh.apply(bemjson))).bem(this.getName());
            block._setModel(model);

            return block;
        },

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
