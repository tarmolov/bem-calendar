modules.define(
    'component_id_sync',
    [
        'inherit',
        'component'
    ],
    function (
        provide,
        inherit,
        BaseComponent
    ) {

    var LOCALSTORAGE_FIELD = 'bem-calendar';

    provide(inherit(BaseComponent, {
        start: function (sandbox) {
            this.__base();
            this._model = sandbox.getModel();
            this._model.on('change', this._onModelChanged, this);
        },

        stop: function () {
            this._model.un('change', this._onModelChanged, this);
            this._model = null;
        },

        _onModelChanged: function () {
            var json = this._model.toJSON();
            localStorage.setItem(LOCALSTORAGE_FIELD, JSON.stringify(json));
        }
    }, {
        getName: function () {
            return 'sync';
        },

        getData: function () {
            var data = localStorage.getItem(LOCALSTORAGE_FIELD);
            return JSON.parse(data);
        }
    }));

});
