/*jshint unused:false*/

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
    stop: function () {},

    /**
     * Returs current component state
     * @returns {Boolean}
     */
    isStarted: function () {}
};

/**
 * Returs ID component
 * @returns {Boolean}
 */
IComponent.getName = function () {};
