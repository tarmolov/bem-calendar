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

    /**
     * Calendar event
     * @augments IBemView
     */
    provide(DOM.decl('event', {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('click', this._onClick, this);
                },
                '': function () {
                    this.__base.apply(this, arguments);
                    this.__self.getPopup().hide();
                    this._model.un('change', this.update, this);
                }
            }
        },

        _onClick: function (e) {
            e.stopPropagation();
            this.openPopup();
        },

        /**
         * Show event popup
         */
        openPopup: function () {
            var popup = this.__self.getPopup();
            this._form = FormEvent.create(this._model, {type: 'event'});
            popup.setContent(this._form);
            popup.show(this.domElem);

            this._form.on('save', this._onSave, this);
            this._form.on('delete', this._onDelete, this);
        },

        /**
         * Hide event popup
         */
        closePopup: function () {
            DOM.destruct(this._form.domElem);
            this._form = null;
            this.__self.getPopup().hide();
        },

        _onSave: function () {
            this.closePopup();
            this.emit('save');
        },

        _onDelete: function () {
            this.closePopup();
            this.emit('delete', this._model);
        },

        getModel: function () {
            return this._model;
        },

        setModel: function (model) {
            if (this._model) {
                this._model.un('change', this.update, this);
            }
            this._model = model;
            this.update();
            this._model.on('change', this.update, this);
        },

        update: function () {
            this.__base.apply(this, arguments);
            this.elem('title').html(this._model.get('title'));
            this.elem('participants').html(this._model.get('participants'));
        }
    }, {
        create: function (model, options) {
            var bemjson = this.getBEMJSON(model, options);
            var block = DOM.init($(bh.apply(bemjson))).bem(this.getName());
            block.setModel(model);
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

        /**
         * Returns popup
         * Singleton
         * @returns {Popup} popup
         */
        getPopup: function () {
            if (!this._popup) {
                this._popup = this._createPopup();
            }
            return this._popup;
        },

        /**
         * Create a new popup
         * @returns {Popup} popup
         */
        _createPopup: function () {
            return Popup.create({
                direction: 'right'
            });
        }
    }));

});
