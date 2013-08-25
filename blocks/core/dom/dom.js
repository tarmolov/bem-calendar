/**
 * Set of dom utils
 */
modules.define('dom', ['vow'], function (provide, Vow) {

var domReadyPromise = Vow.promise();

function onDomReady() {
    if (document.readyState === 'complete') {
        document.removeEventListener('DOMContentLoaded', onDomReady, false);
        domReadyPromise.fulfill();
    }
}

if (document.addEventListener) {
    document.addEventListener('readystatechange', onDomReady, false);
}

provide({
    /**
     * Promise has been fulfilled after dom ready event had happened
     * @type {Vow} promise
     */
    ready: domReadyPromise
});

});
