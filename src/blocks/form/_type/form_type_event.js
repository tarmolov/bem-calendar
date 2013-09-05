modules.define(
    'form_type_event',
    [
        'i-bem__dom',
        'jquery',
        'bh',
        'utils__date'
    ],
    function (
        provide,
        DOM,
        $,
        bh,
        dateUtils
    ) {

    function createForm(model) {
        var block = DOM.init($(bh.apply({
            block: 'form',
            mods: {
                type: 'event'
            },
            content: [
                {
                    block: 'input',
                    mix: [{block: 'form', elem: 'title'}],
                    placeholder: 'Event name'
                },
                {
                    block: 'label',
                    mix: [{block: 'form', elem: 'date'}]
                },
                {
                    block: 'input',
                    mix: [{block: 'form', elem: 'participants'}],
                    placeholder: 'Participants'
                },
                {
                    block: 'input',
                    mods: {type: 'textarea'},
                    mix: [{block: 'form', elem: 'description'}],
                    placeholder: 'Desription'
                },
                {
                    block: 'button',
                    mods: {theme: 'shadow'},
                    mix: [{block: 'form', elem: 'save'}],
                    content: 'Save'
                },
                {
                    block: 'button',
                    mods: {theme: 'shadow'},
                    mix: [{block: 'form', elem: 'delete'}],
                    content: 'Delete'
                }
            ]
        }))).bem('form');
        block._setModel(model);
        return block;
    }

    provide(DOM.decl({block: 'form', modName: 'type', modVal: 'event'}, {
        onSetMod: {
            js: {
                inited: function () {
                    this.__base.apply(this, arguments);

                    this.findBlockInside('save', 'button').on('click', this._onSaveClick, this);
                    this.findBlockInside('delete', 'button').on('click', this._onDeleteClick, this);
                }
            }
        },

        _onSaveClick: function () {
            this._model.set('title', this.findBlockInside('title', 'input').getValue());
            this._model.set('participants', this.findBlockInside('participants', 'input').getValue());
            this._model.set('description', this.findBlockInside('description', 'input').getValue());
            this.emit('save');
        },

        _onDeleteClick: function () {
            this.emit('delete');
        },

        update: function () {
            var date = new Date(this._model.get('date'));
            this.findBlockInside('date', 'label').setText(dateUtils.formatDate(date));
            this.findBlockInside('title', 'input').setValue(this._model.get('title'));
            this.findBlockInside('participants', 'input').setValue(this._model.get('participants'));
            this.findBlockInside('description', 'input').setValue(this._model.get('description'));
        },

        _setModel: function (model) {
            this._model = model;
            this.update();
        }

    }, {
        create: function (type, model) {
            return type === 'event' ?
                createForm(model):
                this.__base.apply(this, arguments);
        }
    }));

});
