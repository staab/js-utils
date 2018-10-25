(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ramda"));
	else if(typeof define === 'function' && define.amd)
		define("js-utils", ["ramda"], factory);
	else if(typeof exports === 'object')
		exports["js-utils"] = factory(require("ramda"));
	else
		root["js-utils"] = factory(root["ramda"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diffObjs = exports.clog = exports.cached = exports.withSelf = exports.swatch = exports.barcode = exports.randInt = exports.notImplemented = exports.doPipe = exports.apply = exports.noop = exports.enforce = exports.parseJsonSafe = exports.tap = exports.wrap = exports.definePrefixedEnum = exports.defineEnum = exports.throttle = exports.waitFor = exports.haltPromiseChain = exports.noopPromise = exports.rejectWith = exports.resolveWith = exports.resolveAfter = exports.safeDivide = exports.round = exports.parseIntegerString = exports.parseFloatString = exports.parsePercent = exports.formatPercent = exports.parseNumericPercent = exports.formatNumericPercent = exports.parseCurrency = exports.formatCurrency = exports.parseNumericCurrency = exports.formatNumericCurrency = exports.randomId = exports.quantify = exports.pluralize = exports.humanToKebab = exports.camelToHuman = exports.camelToSnake = exports.snakeToCamel = exports.humanToSnake = exports.snakeToHuman = exports.ucFirst = exports.fillArray = exports.initArray = exports.isUuid = exports.isInstance = exports.is = exports.splice = exports.sumProp = exports.invert = exports.chunk = exports.intersperseWith = exports.concatAll = exports.enumerate = exports.first = exports.createMapOf = exports.createMap = exports.renameProp = exports.incrementProp = exports.objToArgs = exports.argsToObj = exports.mapObjPairs = exports.isObject = exports.modifyKeysRecursive = exports.modifyKeys = exports.count = exports.pickValues = exports.findObjIndex = exports.findObj = exports.findObjPair = exports.forEachObj = exports.mergeRight = exports.assocPathMutable = exports.fillKeys = exports.replaceValues = exports.moveProp = exports.copyProp = exports.mergeIn = exports.updateIn = exports.mergePath = exports.updatePath = exports.dotPath = exports.arrPath = exports.ensurePlural = exports.isPlural = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint func-names: 0, no-invalid-this: 0, max-lines: 0, no-undefined: 0 */


var _ramda = __webpack_require__(1);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ============================================================================
// Cardinality

var isPlural = exports.isPlural = function isPlural(value) {
  return value instanceof Array;
};

var ensurePlural = exports.ensurePlural = function ensurePlural(value) {
  return isPlural(value) ? value : [value];
};

// ============================================================================
// Paths

var arrPath = exports.arrPath = function arrPath(path) {
  return is('string', path) ? path.split('.') : path;
};

var dotPath = exports.dotPath = function dotPath(path) {
  return is('array', path) ? path.join('.') : path;
};

var updatePath = exports.updatePath = (0, _ramda.curry)(function (path, update, obj) {
  var value = (0, _ramda.path)(path, obj);
  var parent = (0, _ramda.path)(path.slice(0, -1), obj);

  // Provide the value at the path, the value's immediate parent, and the root
  // object as context
  var result = update(value, parent, obj);

  // Return the entire object with the path changed
  return (0, _ramda.assocPath)(path, result, obj);
});

var mergePath = exports.mergePath = (0, _ramda.curry)(function (path, value, obj) {
  return (0, _ramda.assocPath)(path, (0, _ramda.merge)((0, _ramda.path)(path, obj), value), obj);
});

// In's are just shortcut versions of paths
var updateIn = exports.updateIn = (0, _ramda.curry)(function (key, update, obj) {
  return updatePath([key], (0, _ramda.binary)(update), obj);
});

var mergeIn = exports.mergeIn = (0, _ramda.curry)(function (key, value, obj) {
  return mergePath([key], value, obj);
});

var copyProp = exports.copyProp = (0, _ramda.curry)(function (fromKey, toKey, obj) {
  return _extends({}, obj, _defineProperty({}, toKey, obj[fromKey]));
});

var moveProp = exports.moveProp = (0, _ramda.curry)(function (fromKey, toKey, obj) {
  return (0, _ramda.omit)([fromKey], copyProp(fromKey, toKey, obj));
});

var replaceValues = exports.replaceValues = (0, _ramda.curry)(function (matchFn, toValue, obj) {
  return (0, _ramda.mapObjIndexed)((0, _ramda.when)(matchFn, (0, _ramda.always)(toValue)), obj);
});

var fillKeys = exports.fillKeys = (0, _ramda.curry)(function (keys, value) {
  return (0, _ramda.zipObj)(keys, keys.map(function () {
    return (0, _ramda.clone)(value);
  }));
});

var assocPathMutable = exports.assocPathMutable = (0, _ramda.curry)(function (path, value, obj) {
  var rootObj = obj;

  while (path.length > 1) {
    obj[path[0]] = obj[path[0]] || {};
    obj = obj[path[0]];
    path = path.slice(1);
  }

  obj[path[0]] = value;

  return rootObj;
});

// ============================================================================
// Objects

var mergeRight = exports.mergeRight = (0, _ramda.curry)(function (left, right) {
  return _extends({}, right, left);
});

var forEachObj = exports.forEachObj = function forEachObj(fn, obj) {
  return (0, _ramda.toPairs)(obj).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return fn(value, key);
  });
};

var findObjPair = exports.findObjPair = function findObjPair(fn, obj) {
  return (0, _ramda.find)(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return fn(value, key);
  }, (0, _ramda.toPairs)(obj));
};

var findObj = exports.findObj = function findObj(fn, obj) {
  return (0, _ramda.nth)(1, findObjPair(fn, obj) || []);
};

var findObjIndex = exports.findObjIndex = (0, _ramda.curry)(function (fn, obj) {
  return (0, _ramda.nth)(0, findObjPair(fn, obj) || []);
});

var pickValues = exports.pickValues = (0, _ramda.curry)(function (keys, obj) {
  return keys.map(function (key) {
    return obj[key];
  });
});

var count = exports.count = function count(obj) {
  return (0, _ramda.keys)(obj).length;
};

var modifyKeys = exports.modifyKeys = (0, _ramda.curry)(function (fn, obj) {
  return (0, _ramda.zipObj)((0, _ramda.keys)(obj).map(fn), (0, _ramda.values)(obj));
});

var modifyKeysRecursive = exports.modifyKeysRecursive = (0, _ramda.curry)(function (fn, value) {
  if ((0, _ramda.is)(Array, value)) {
    return value.map(modifyKeysRecursive(fn));
  }

  // Only recurse into pojos
  if (!isObject(value) || value.constructor !== Object) {
    return value;
  }

  return (0, _ramda.zipObj)((0, _ramda.keys)(value).map(fn), (0, _ramda.values)(value).map(modifyKeysRecursive(fn)));
});

var isObject = exports.isObject = function isObject(value) {
  return (0, _ramda.is)(Object, value) && !(0, _ramda.is)(Array, value);
};

var mapObjPairs = exports.mapObjPairs = function mapObjPairs(fn, obj) {
  return (0, _ramda.fromPairs)((0, _ramda.toPairs)(obj).map(fn));
};

// Gotta curry this kinda manually since keys/args might have 0 length
var argsToObj = exports.argsToObj = function argsToObj(keys) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (args.length) {
    return (0, _ramda.fromPairs)(keys.map(function (key, idx) {
      return [key, args[idx]];
    }));
  }

  return function () {
    for (var _len2 = arguments.length, moreArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      moreArgs[_key2] = arguments[_key2];
    }

    return (0, _ramda.fromPairs)(keys.map(function (key, idx) {
      return [key, moreArgs[idx]];
    }));
  };
};

var objToArgs = exports.objToArgs = (0, _ramda.curry)(function (keys, obj) {
  return keys.map(function (key) {
    return obj[key];
  });
});

var incrementProp = exports.incrementProp = function incrementProp(key) {
  var incr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return function (value) {
    return _extends({}, value, _defineProperty({}, key, value[key] + incr));
  };
};

var renameProp = exports.renameProp = (0, _ramda.curry)(function (fromName, toName, obj) {
  return _extends({}, (0, _ramda.omit)([fromName], obj), _defineProperty({}, toName, obj[fromName]));
});

var createMap = exports.createMap = (0, _ramda.curry)(function (key, collection) {
  return (0, _ramda.indexBy)((0, _ramda.prop)(key), collection || []);
});

var createMapOf = exports.createMapOf = (0, _ramda.curry)(function (key, valueKey, collection) {
  return (0, _ramda.fromPairs)((collection || []).map(function (item) {
    return [item[key], item[valueKey]];
  }));
});

// ============================================================================
// Arrays

var first = exports.first = function first(list) {
  return list[0];
};

var enumerate = exports.enumerate = function enumerate(list) {
  return list.map(function (item, idx) {
    return [item, idx];
  });
};

var concatAll = exports.concatAll = function concatAll() {
  var lists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return lists.reduce(_ramda.concat, []);
};

var intersperseWith = exports.intersperseWith = (0, _ramda.curry)(function (fn, coll) {
  return coll.reduce(function (result, item, idx) {
    return result.length ? result.concat([fn(item, idx), item]) : result.concat(item);
  }, []);
});

var chunk = exports.chunk = (0, _ramda.curry)(function (chunkLength, coll) {
  var result = [];
  var current = [];

  coll.forEach(function (item) {
    if (current.length < chunkLength) {
      current.push(item);
    }

    if (current.length === chunkLength) {
      result.push(current);
      current = [];
    }
  });

  if (current.length > 0) {
    result.push(current);
  }

  return result;
});

var invert = exports.invert = function invert(nestedArray) {
  var result = [];

  nestedArray.forEach(function (inner, outerIdx) {
    return inner.forEach(function (value, innerIdx) {
      result[innerIdx] = result[innerIdx] || [];
      result[innerIdx][outerIdx] = value;
    });
  });

  return result;
};

var sumProp = exports.sumProp = (0, _ramda.curry)(function (key, coll) {
  return (0, _ramda.sum)((0, _ramda.pluck)(key, coll));
});

var splice = exports.splice = (0, _ramda.curry)(function (idx, n, v) {
  return v.slice(0, idx).concat(v.slice(idx + n));
});

// ============================================================================
// Types

var is = exports.is = (0, _ramda.curry)(function (type, value) {
  // typeof [] === 'object'
  if (isInstance(Array, value)) {
    return type === 'array';
  }

  // typeof null === 'object'
  if (value === null) {
    return type === 'null';
  }

  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;
});

var isInstance = exports.isInstance = (0, _ramda.curry)(function (types, value) {
  return (0, _ramda.any)(function (type) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value instanceof type;
  }, ensurePlural(types));
});

var isUuid = exports.isUuid = function isUuid(value) {
  return value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
};

var initArray = exports.initArray = function initArray(length, init) {
  return (0, _ramda.map)(init, new Array(length));
};

var fillArray = exports.fillArray = function fillArray(length, item) {
  return (0, _ramda.map)((0, _ramda.always)(item), new Array(length));
};

// ============================================================================
// Strings

var ucFirst = exports.ucFirst = function ucFirst(value) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
};

var snakeToHuman = exports.snakeToHuman = (0, _ramda.pipe)(_ramda.toLower, (0, _ramda.split)('_'), (0, _ramda.map)(ucFirst), (0, _ramda.join)(' '));

var humanToSnake = exports.humanToSnake = function humanToSnake(value) {
  return value.replace(/ /g, '_').toLowerCase();
};

var snakeToCamel = exports.snakeToCamel = function snakeToCamel(value) {
  return value.split('_').map(function (sub, idx) {
    return idx === 0 ? sub : ucFirst(sub.toLowerCase());
  }).join('');
};

var camelToSnake = exports.camelToSnake = (0, _ramda.replace)(/([A-Z])/g, function (match) {
  return '_' + match.toLowerCase();
});

var camelToHuman = exports.camelToHuman = (0, _ramda.pipe)(camelToSnake, snakeToHuman);

var humanToKebab = exports.humanToKebab = function humanToKebab(value) {
  return value.replace(/ /g, '-').toLowerCase();
};

var pluralize = exports.pluralize = function pluralize(value, label, pluralLabel) {
  return value === 1 ? label : pluralLabel || label + 's';
};

var quantify = exports.quantify = function quantify(value, label, pluralLabel) {
  return value + ' ' + pluralize(value, label, pluralLabel);
};

var randomId = exports.randomId = function randomId() {
  return Math.random().toString().slice(2);
};

// ============================================================================
// Currency

var formatNumericCurrency = exports.formatNumericCurrency = function formatNumericCurrency(cents) {
  return (cents / 100).toFixed(2);
};

var parseNumericCurrency = exports.parseNumericCurrency = function parseNumericCurrency(display) {
  return Math.round(parseFloatString(display) * 100);
};

var formatCurrency = exports.formatCurrency = function formatCurrency(cents) {
  return cents >= 0 ? '$' + formatNumericCurrency(cents) : '-$' + formatNumericCurrency(Math.abs(cents));
};

var parseCurrency = exports.parseCurrency = function parseCurrency(display) {
  return parseNumericCurrency(display.replace('$', ''));
};

// ============================================================================
// Percents

var removeExtraZeroes = function removeExtraZeroes(num) {
  return String(parseFloat(num));
};

var formatNumericPercent = exports.formatNumericPercent = function formatNumericPercent(num) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$denom = _ref5.denom,
      denom = _ref5$denom === undefined ? 100 : _ref5$denom,
      precision = _ref5.precision;

  var result = num / denom * 100;

  if (precision !== undefined) {
    result = result.toFixed(precision);
  }

  return removeExtraZeroes(result);
};

var parseNumericPercent = exports.parseNumericPercent = function parseNumericPercent(display) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref6$denom = _ref6.denom,
      denom = _ref6$denom === undefined ? 100 : _ref6$denom,
      precision = _ref6.precision;

  var result = parseFloatString(display) / (100 / denom);

  if (precision !== undefined) {
    result = round(precision, result);
  }

  return result;
};

var formatPercent = exports.formatPercent = (0, _ramda.pipe)(formatNumericPercent, function (value) {
  return value + '%';
});

var parsePercent = exports.parsePercent = function parsePercent(value) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return parseNumericPercent.apply(undefined, [value.replace('%', '')].concat(args));
};

// ============================================================================
// Numbers

var parseFloatString = exports.parseFloatString = function parseFloatString(value) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (is('number', value) && !isNaN(value)) {
    return parseFloat(value);
  }

  value = parseFloat(value.toString().replace(parseFloatString.DOT_REGEXP, '.').trim());

  return isNaN(value) ? fallback : value;
};

parseFloatString.DOT_REGEXP = new RegExp(/\.+/);

var parseIntegerString = exports.parseIntegerString = function parseIntegerString(value) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return parseInt(parseFloatString(value, fallback), 10);
};

var round = exports.round = function round(precision, value) {
  return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
};

var safeDivide = exports.safeDivide = function safeDivide(a, b) {
  var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return b === 0 ? 0 : round(precision, a / b);
};

// ============================================================================
// Promises

var resolveAfter = exports.resolveAfter = (0, _ramda.curry)(function (duration, value) {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(value);
    }, duration);
  });
});

var resolveWith = exports.resolveWith = function resolveWith(fn) {
  return function () {
    return Promise.resolve(fn.apply(undefined, arguments));
  };
};

var rejectWith = exports.rejectWith = function rejectWith(fn) {
  return function () {
    return Promise.reject(fn.apply(undefined, arguments));
  };
};

var noopPromise = exports.noopPromise = { then: function then() {
    return noopPromise;
  }, catch: function _catch() {
    return noopPromise;
  } };

var haltPromiseChain = exports.haltPromiseChain = function haltPromiseChain(promise) {
  return promise.catch(noop) || noopPromise;
};

var waitFor = exports.waitFor = function waitFor(condition) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  return new Promise(function (resolve) {
    (function tryIt() {
      var result = condition();

      if (result) {
        resolve(result);
      } else {
        setTimeout(tryIt, timeout);
      }
    })();
  });
};

var throttle = exports.throttle = function throttle(threshhold, fn) {
  var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return (
    // Scope can be passed in so we can throttle multiple functions
    // with the same promise

    function () {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      // If there's a timeout, that means there was a previous call. Cancel it.
      clearTimeout(scope.timeout);

      // If there isn't a resolution function, that means any old calls completed
      // _resolve and _promise are shared by all throttled callers so everyone
      // gets the most recent value
      if (!scope.resolve || scope.cancelStale) {
        if (scope.promise) {
          scope.promise.catch(noop);
        }

        scope.promise = new Promise(function (resolve) {
          scope.resolve = resolve;
        });
      }

      // Wait until inputs slow down to call the function
      scope.timeout = setTimeout(function () {
        // Now call the function and resolve with the return value
        scope.resolve(fn.apply(undefined, args));

        // Clear out the resolve function, which indicates there are callers
        // waiting on the most recent result
        scope.resolve = null;
        scope.timeout = null;
      }, threshhold);

      return scope.promise;
    }
  );
};

// ============================================================================
// Really misc

// Let enums be an array, but also add some properties to access values with
var defineEnum = exports.defineEnum = function defineEnum(values) {
  values.forEach(function (value) {
    values[value.toUpperCase()] = value;
  });

  return values;
};

var definePrefixedEnum = exports.definePrefixedEnum = function definePrefixedEnum(prefix, values) {
  values.forEach(function (value) {
    values[value.toUpperCase()] = '' + prefix + value;
  });

  return values;
};

// A promise-like interface, but sync. For better ramda chaining,
// inspired by clojure's thread macro
var wrap = exports.wrap = function wrap(value) {
  return {
    then: function then(fn) {
      return wrap(fn(value));
    },
    unwrap: (0, _ramda.always)(value)
  };
};

// Re implement tap to not be auto-curried like in ramda
var tap = exports.tap = function tap(fn) {
  return function (value) {
    fn(value);

    return value;
  };
};

var parseJsonSafe = exports.parseJsonSafe = function parseJsonSafe(value) {
  try {
    return JSON.parse(value);
  } catch (err) {
    return undefined;
  }
};

var enforce = exports.enforce = function enforce(condition, message) {
  if (!condition) {
    throw new Error(message);
  }

  return condition;
};

var noop = exports.noop = (0, _ramda.always)(undefined);

var apply = exports.apply = function apply(fn, args) {
  return fn.apply(undefined, _toConsumableArray(args));
};

var doPipe = exports.doPipe = function doPipe(value, fns) {
  return fns.reduce(function (v, fn) {
    return fn(v);
  }, value);
};

var notImplemented = exports.notImplemented = function notImplemented(message) {
  return function () {
    throw new Error(message);
  };
};

var randInt = exports.randInt = function randInt() {
  return Math.ceil(Math.random() * 9);
};

var barcode = exports.barcode = function barcode() {
  return initArray(12, randInt).join('');
};

var swatch = exports.swatch = function swatch(value, defaultResult, cases) {
  var result = cases[value];

  return result === undefined ? defaultResult : result;
};

var withSelf = exports.withSelf = function withSelf(fn) {
  return function () {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return fn.apply(undefined, [this].concat(args));
  };
};

var cached = exports.cached = function cached(obj, path, getNewValue) {
  var value = (0, _ramda.path)(path, obj);

  if (value === undefined) {
    value = getNewValue();

    assocPathMutable(path, value, obj);
  }

  return value;
};

var clog = exports.clog = (0, _ramda.curryN)(2, function clog(info, value) {
  /* eslint no-console: 0*/
  enforce(arguments.length === 2, 'Both info and value should be provided to clog');

  console.log(info, value);

  return value;
});

var diffObjs = exports.diffObjs = function diffObjs(obj1, obj2) {
  var diff = [];

  (0, _ramda.uniq)((0, _ramda.keys)(obj1).concat((0, _ramda.keys)(obj2))).forEach(function (key) {
    if (obj1[key] === undefined && obj2[key] !== undefined) {
      diff.push(['key "' + key + '" is new in object 2. New value:', obj2[key]]);
    }

    if (obj2[key] === undefined && obj1[key] !== undefined) {
      diff.push(['key "' + key + '" was removed in object 2. Old value:', obj1[key]]);
    }

    if (!(0, _ramda.equals)(obj1[key], obj2[key])) {
      diff.push(['key "' + key + '" was changed in object 2. Old value: ', obj1[key], 'New value:', obj2[key]]);
    } else if (obj1[key] !== obj2[key]) {
      diff.push(['key "' + key + '" was changed in object 2 (by identity, but not value)']);
    }
  });

  return diff;
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=js-utils.js.map