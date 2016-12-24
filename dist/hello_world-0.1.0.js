/*
 * hello_world-0.1.0.js [2016-12-25 03:26:30+0900]
 * Copyright(c) 2016 @Azicore (http://azisava.sakura.ne.jp/)
 * Released under the MIT license (http://opensource.org/licenses/mit-license.php)
 */


(function() {
    'use strict';

    var HelloWorld = function() {
        this.message = 'Hello, world!';
    };
    HelloWorld.prototype = {
        get: function() {
            return this.message;
        },
        print: function() {
            console.log(this.message);
        },
        alert: function() {
            alert(this.message);
        }
    };

    if (module && typeof module.exports !== 'undefined') {
        module.exports = HelloWorld;
    } else if (window && typeof window.HelloWorld === 'undefined') {
        window.HelloWorld = HelloWorld;
    }

})();
