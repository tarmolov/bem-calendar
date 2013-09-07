modules.define(
    'app',
    [
        'inherit',
        'sandbox',
        'model',
        'model_type_list',
        'component-manager',
        'component_id_toolbar',
        'component_id_search',
        'component_id_navigation',
        'component_id_calendar',
        'component_id_sync'
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
        Calendar,
        Sync
    ) {

    provide(inherit({
        __constructor: function (rootBlock) {
            this._rootBlock = rootBlock;
            this._model = new Model(Sync.getData());
            this._sandbox = new Sandbox(this);
            var componentManager = this._componentManager = new ComponentManager();

            componentManager.register(ToolBar);
            componentManager.register(Search);
            componentManager.register(Navigation);
            componentManager.register(Calendar);
            componentManager.register(Sync);
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
