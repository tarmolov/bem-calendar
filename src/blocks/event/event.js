modules.define(
    'event',
    [
        'i-bem__dom',
        'jquery',
        'bh',
        'popup',
        'form_type_event',
        'model'
    ],
    function (
        provide,
        DOM,
        $,
        bh,
        Popup,
        FormEvent,
        Model
    ) {

    provide(DOM.decl('event', {
        onSetMod: {
            js: {
                inited: function () {
                    this._model = new Model({
                        date: this.params.date
                    });
                    this.bindTo('click', this._onClick, this);
                }
            }
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
        },

        update: function () {
        },

        _setModel: function (model) {
            this._model = model;
            this.update();
        }
    }, {
        create: function (model) {
            var bemjson = this.getBEMJSON(model);
            var block = DOM.init($(bh.apply(bemjson))).bem(this.getName());
            block._setModel(model);
            block.update();

            return block;
        },

        getBEMJSON: function (model) {
            return {
                block: 'event',
                js: model.toJSON()
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
