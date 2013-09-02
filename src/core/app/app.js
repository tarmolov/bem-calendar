modules.define(
    'app',
    [
        'inherit',
        'sandbox',
        'model',
        'model_type_list',
        'component-manager',
        'toolbar-component',
        'search-component',
        'navigation-component',
        'calendar-component'
    ],
    function (
        provide,
        inherit,
        Sandbox,
        Model,
        ListModel,
        ComponentManager,
        ToolBar,
        Search,
        Navigation,
        Calendar
    ) {

    provide(inherit({
        __constructor: function (rootBlock) {
            this._rootBlock = rootBlock;
            this._model = new Model(this._getInitialData());
            this._sandbox = new Sandbox(this);
            var componentManager = this._componentManager = new ComponentManager();

            this._sandbox
                .on('change-current-date', function (e, date) {
                    this._model.set('currentDate', date);
                }, this);

            componentManager.register(ToolBar);
            componentManager.register(Search);
            componentManager.register(Navigation);
            componentManager.register(Calendar);
            componentManager.startAll(this._sandbox);
        },

        destruct: function () {
            this._componentManager.stopAll();
            this._componentManager = null;

            this._sandBox = null;

            this._layout.destruct();
            this._layout = null;

            this._rootBlock = null;
        },

        _getInitialData: function () {
            var now = new Date();
            var events = new ListModel();
            events.add(new Model({
                date: 1377460800000
            }));

            return {
                currentDate: now,
                selectedDate: now,
                events: events
            };
        },

        getPlaceholderElement: function (id) {
            var placeholder = this._rootBlock.findBlockInside({
                block: 'placeholder',
                modName: 'id',
                modVal: id
            });

            return placeholder && placeholder.domElem;
        },

        getModel: function () {
            return this._model;
        }
    }));

});
