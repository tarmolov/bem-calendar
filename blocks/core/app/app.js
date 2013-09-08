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

    /**
     * Application.
     *
     * Create sandbox and runs components.
     */
    provide(inherit({
        /**
         * @param {jQuery} rootBlock Root DOM node for application
         */
        __constructor: function (rootBlock) {
            this._rootBlock = rootBlock;
            this._model = new Model(Sync.getData());
            this._sandbox = new Sandbox(this);
            var componentManager = this._componentManager = new ComponentManager();

            this._sandbox.on('force-update', this.restart, this);

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
            this._sandbox.un('force-update', this.restart, this);
            this._sandBox = null;
            this._model = null;
            this._rootBlock = null;
        },

        /**
         * Restart application
         */
        restart: function () {
            this._componentManager.stopAll();
            this._model = new Model(Sync.getData());
            this._componentManager.startAll(this._sandbox);
        },

        /**
         * Returns placeholder for component.
         * Component uses this placeholder for building its layout.
         * @param {String} id Component ID
         * @returns {jQuery} placeholder
         */
        getPlaceholderElement: function (id) {
            var placeholder = this._rootBlock.findBlockInside({
                block: 'placeholder',
                modName: 'id',
                modVal: id
            });

            return placeholder && placeholder.domElem;
        },

        /**
         * Returns application model
         * @returns {Model} model
         */
        getModel: function () {
            return this._model;
        }
    }));

});
