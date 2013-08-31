modules.define(
    'app',
    [
        'inherit',
        'sandbox',
        'model',
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
        ComponentManager,
        ToolBar,
        Search,
        Navigation,
        Calendar
    ) {

    provide(inherit({
        __constructor: function (rootBlock) {
            this._rootBlock = rootBlock;
            this._sandbox = new Sandbox(this);
            this._model = new Model(this._getInitialData());
            var componentManager = this._componentManager = new ComponentManager();

            componentManager.register('toolbar', ToolBar);
            componentManager.register('search', Search);
            componentManager.register('navigation', Navigation);
            componentManager.register('calendar', Calendar);
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
            return {
                currentDate: now,
                selectedDate: now
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
