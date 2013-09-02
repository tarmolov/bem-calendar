modules.define(
    'event',
    [
        'i-bem__dom',
        'jquery',
        'bh',
        'popup',
        'utils__date'
    ],
    function (
        provide,
        DOM,
        $,
        bh,
        Popup,
        dateUtils
    ) {

    function getPopupContentJSON(data) {
        return {
            block: 'form',
            attrs: {
                style: 'width:215px'
            },
            content: [
                {
                    block: 'input',
                    mix: [{block: 'event', elem: 'form', mods: {type: 'input'}}],
                    placeholder: 'Event name',
                    content: data.name || ''
                },
                {
                    block: 'event',
                    elem: 'form',
                    mods: {type: 'date'},
                    content: dateUtils.formatDate(data.date)
                },
                {
                    block: 'input',
                    mix: [{block: 'event', elem: 'form', mods: {type: 'input'}}],
                    placeholder: 'Participants',
                    content: data.participants || ''
                },
                {
                    block: 'input',
                    mods: {type: 'textarea'},
                    mix: [{block: 'event', elem: 'form', mods: {type: 'description'}}],
                    placeholder: 'Desription',
                    content: data.description || ''
                },
                {block: 'button', mods: {theme: 'shadow'}, content: 'Save'},
                {block: 'button', mods: {theme: 'shadow'}, content: 'Delete'}
            ]
        };
    }

    provide(DOM.decl('event', {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('click', this._onClick, this);
                }
            }
        },

        _onClick: function (e) {
            e.stopPropagation();
            if (this._popup) {
                this._popup.destruct();
            }
            this.openPopup();
        },

        openPopup: function () {
            this._popup = Popup.create({
                direction: 'right',
                content: getPopupContentJSON(this.params)
            });
            this._popup.show(this.domElem);
        },

        closePopup: function () {
            this._popup.hide();
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
        }
    }));

});
