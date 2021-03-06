modules.define('component-manager', ['inherit'], function (provide, inherit) {

    /**
     * Component manager
     * It makes it possible to start and stop components
     */
    provide(inherit({
        __constructor: function () {
            this._registeredComponents = {};
            this._runningComponents = {};
        },

        /**
         * Registers new component
         * @param {IComponent} component
         */
        register: function (component) {
            this._registeredComponents[component.getName()] = component;
        },

        /**
         * Runs component
         * @param {String} id
         * @param {ISandbox} sandbox
         */
        start: function (id, sandbox) {
            var component = this.getComponent(id);
            if (component && !component.isStarted()) {
                component.start(sandbox);
            }
        },

        /**
         * Stops component
         * @param {String} id
         */
        stop: function (id) {
            var component = this.getComponent(id);
            if (component && component.isStarted()) {
                component.stop();
                delete this._runningComponents[id];
            }
        },

        /**
         * Runs all registered components
         * @param {ISandbox} sandbox
         */
        startAll: function (sandbox) {
            this._each(function (id) {
                this.start(id, sandbox);
            }, this);
        },

        /**
         * Stops all registered components
         */
        stopAll: function () {
            this._each(function (id) {
                this.stop(id);
            }, this);
        },

        /**
         * Returns a component by ID
         * @param {String} id
         * @return {IComponent} component
         */
        getComponent: function (id) {
            if (!this._registeredComponents[id]) {
                return false;
            }

            var component = this._runningComponents[id];
            if (!component) {
                component = new this._registeredComponents[id]();
                this._runningComponents[id] = component;
            }
            return component;
        },

        /**
         * Iterates the components
         * @param {Function} callback Callback which would be called for each component
         * @return {Object} context
         */
        _each: function (callback, context) {
            Object.keys(this._registeredComponents).forEach(callback, context);
        }
    }));

});
