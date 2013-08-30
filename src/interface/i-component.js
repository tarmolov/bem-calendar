/**
 * @class Component Interface
 */
var IComponent = function () {};

IComponent.prototype = {
    /**
     * Starts component
     * @param {ISandbox} sandbox
     */
    start: function (sandbox) {},

    /**
     * Stops component
     */
    start: function () {},

    /**
     * Returs current component state
     * @returns {Boolean}
     */
    isStarted: function () {},
}
