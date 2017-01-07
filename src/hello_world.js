// jshint devel: true
(function() {
    'use strict';
    var AzisavaLibs = window.AzisavaLibs || (window.AzisavaLibs = {});
    
    /**
     * Create HelloWorld object.
     * @constructor
     * @memberof AzisavaLibs
     * @classdesc HelloWorld class
     * @param {string} val - A value.
     */
    AzisavaLibs.HelloWorld = function(val) {
        /**
         * A message.
         * @type {string}
         */
        this.message = 'Hello, world!';
        /**
         * A value.
         * @type {number}
         */
        this.val = val;
    };
    /**
     * Get HelloWorld.
     * @memberof AzisavaLibs
     * @param {string} val - A value.
     * @return {string} HelloWorld message
     */
    AzisavaLibs.HelloWorld.prototype.get = function(val) {
        this.val = val;
        return this.message;
    };
    /**
     * Print HelloWorld.
     * @memberof AzisavaLibs
     * @param {string} val - A value.
     */
    AzisavaLibs.HelloWorld.prototype.print = function(val) {
        this.val = val;
        console.log(this.message);
    };
    /**
     * Alert HelloWorld.
     * @memberof AzisavaLibs
     * @param {string} val - A value.
     */
    AzisavaLibs.HelloWorld.prototype.alert = function(val) {
        this.val = val;
        alert(this.message);
    };
    
})();
