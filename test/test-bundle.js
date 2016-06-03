/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	var observable = __webpack_require__(1).observable;

	var o = observable({});

	function foo(e) {
		console.log(e);
	}

	o
		.on('foo', foo)
		.notify({type: 'foo'})
		.off('foo', foo)
		.notify({type: 'foo'});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	var forEach = __webpack_require__(2).forEach;

	exports.observable = function(object) {
		if(!(object instanceof Object)) {
			return object;
		}
		if(object.isObservable) {
			return object;
		}
		var observers = {};
		return Object.defineProperties(object, {
			isObservable: {
				value: true
			},
			on: {
				value: function(type, callback) {
					if(observers[type] === undefined) {
						observers[type] = [];
					}
					observers[type].push(callback);
					return object;
				}
			},
			off: {
				value: function(type, callback) {
					if(type === undefined) {
						observers = {};
						return object;
					}
					if(callback === undefined) {
						observers[type] = [];
						return object;
					}
					if(observers[type] === undefined) {
						return object;
					}
					forEach(observers[type], function(value, index) {
						if(value == callback) {
							observers[type].splice(index, 1);
							return false;
						}
					});
					return object;
				}
			},
			once: {
				value: function(type, callback) {
					var once = function() {
						object.off(type, callback).off(type, once);
					};
					return object.on(type, callback).on(type, once);
				}
			},
			notify: {
				value: function(message) {
					if(observers[message.type] === undefined) {
						return object;
					}
					forEach(observers[message.type].slice(0), function(callback) {
						callback(message);
					});
					return object;
				}
			}
		});
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	
	exports.forEach = function(array, callback) {
		for(var i = 0, length = array.length; i < length; i++) {
			if(callback(array[i], i, array) === false) {
				break;
			}
		}
		return array;
	};


/***/ }
/******/ ]);