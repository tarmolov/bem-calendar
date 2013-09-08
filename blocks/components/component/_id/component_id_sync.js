modules.define(
    'component_id_sync',
    [
        'inherit',
        'component',
        'jquery'
    ],
    function (
        provide,
        inherit,
        BaseComponent,
        $
    ) {

    var LOCALSTORAGE_FIELD = 'bem-calendar';

    /**
     * LocalStorage sync.
     * Saves data to localStorage for every model changing.
     */
    provide(inherit(BaseComponent, {
        start: function (sandbox) {
            this.__base.apply(this, arguments);

            this._model = sandbox.getModel();
            this._model.on('change', this._onModelChanged, this);
        },

        stop: function () {
            this.__base.apply(this, arguments);

            this._model.un('change', this._onModelChanged, this);
            this._model = null;
        },

        /**
         * Saves model to localStorage
         */
        _onModelChanged: function () {
            var json = this._model.toJSON();
            localStorage.setItem(LOCALSTORAGE_FIELD, JSON.stringify(json));
        }
    }, {
        getName: function () {
            return 'sync';
        },

        /**
         * Extends data by default values
         * @param {Object} data
         * @returns {Object} preprocessedData
         */
        _preprocessData: function (data) {
            var now = (new Date()).getTime();
            return $.extend(
                {
                    events: []
                },
                data,
                {
                    currentDate: now,
                    selectedDate: now
                }
            );
        },

        /**
         * Returns data from localStorage
         * @returns {JSON} data
         */
        getData: function () {
            var data = localStorage.getItem(LOCALSTORAGE_FIELD);
            return this._preprocessData(JSON.parse(data));
        }
    }));

});
