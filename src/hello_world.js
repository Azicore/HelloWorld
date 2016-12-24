
// jshint devel: true
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
