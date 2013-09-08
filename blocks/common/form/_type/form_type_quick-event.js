modules.define(
    'form_type_quick-event',
    [
        'i-bem__dom',
        'jquery',
        'bh',
        'utils__date',
        'model'
    ],
    function (
        provide,
        DOM,
        $,
        bh,
        dateUtils,
        Model
    ) {

    provide(DOM.decl({block: 'form', modName: 'type', modVal: 'quick-event'}, {
        onSetMod: {
            js: {
                inited: function () {
                    this.__base.apply(this, arguments);

                    this.findBlockInside('add', 'button').on('click', this._onCreateClick, this);
                }
            }
        },

        _onCreateClick: function () {
            var str = this.findBlockInside('title', 'input').getValue();
            // Format: <month> <date>[, <title>]
            var matches = str.match(/(\w+)\s+(\d+)(?:\W+(\w+))*/);
            if (matches) {
                var month = dateUtils.getMonthNumber(matches[1]);
                var now = new Date();
                var year = now.getFullYear();
                var day = Number(matches[2]);
                this.emit('create', new Model({
                    date: new Date(year, month === -1 ? now.getMonth() : month, day).getTime(),
                    title: matches[3]
                }));
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
        create: function (type, model) {
            if (type === 'quick-event') {
                var bemjson = this.getBEMJSON(type);
                var block = DOM.init($(bh.apply(bemjson))).bem(this.getName());
                block.setModel(model);
                return block;
            } else {
                return this.__base.apply(this, arguments);
            }
        },

        getBEMJSON: function (type) {
            return type === 'quick-event' ?
                {
                    block: 'form',
                    mods: {
                        type: 'quick-event'
                    },
                    content: [
                        {
                            block: 'input',
                            mix: [{block: 'form', elem: 'title'}],
                            placeholder: 'March 5, My birthday'
                        },
                        {
                            block: 'button',
                            mods: {theme: 'shadow'},
                            mix: [{block: 'form', elem: 'add'}],
                            content: 'Add'
                        }
                    ]
                }:
                this.__base.apply(this, arguments);
        }
    }));

});
