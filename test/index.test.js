/* eslint no-new-wrappers: 0, max-lines: 0, max-statements: 0, no-undefined: 0 */

import {assert} from 'chai'
import {equals, keys, always, intersperse} from 'ramda'
import * as U from 'js-utils'

describe('utils/misc', () => {
  describe('isPlural', () => {
    it('should recognize arrays of any length', () => {
      assert.isTrue(U.isPlural([]))
      assert.isTrue(U.isPlural([1]))
      assert.isTrue(U.isPlural(['things', {}]))
    })

    it('should not recognize objects', () => {
      assert.isFalse(U.isPlural({}))
      assert.isFalse(U.isPlural({a: 1}))
    })
  })

  // Paths

  describe('arrPath', () => {
    it('should convert string paths to array paths', () => {
      assert.deepEqual(U.arrPath('this.is.a.path'), ['this', 'is', 'a', 'path'])
    })

    it('should pass array paths through unchanged', () => {
      assert.deepEqual(U.arrPath(['this', 'is', 'a', 'path']), ['this', 'is', 'a', 'path'])
    })
  })

  describe('dotPath', () => {
    it('should convert array paths to string paths', () => {
      assert.deepEqual(U.dotPath(['this', 'is', 'a', 'path']), 'this.is.a.path')
    })

    it('should pass string paths through unchanged', () => {
      assert.deepEqual(U.dotPath('this.is.a.path'), 'this.is.a.path')
    })
  })

  describe('updatePath', () => {
    const obj = {x: {y: {z: 1}}, y: {z: 2}, z: 3}

    it('should provide value, parent, and root as context', () => {
      U.updatePath(['x', 'y', 'z'], (value, parent, rootObj) => {
        assert.equal(value, 1)
        assert.deepEqual(parent, {z: 1})
        assert.deepEqual(rootObj, obj)
      }, obj)
    })

    it('should set returned value to the object at a given path of any length', () => {
      assert.equal(U.updatePath([], always(2), obj), 2)
      assert.deepEqual(U.updatePath(['x'], always(2), obj), {x: 2, y: {z: 2}, z: 3})
      assert.deepEqual(U.updatePath(['x', 'y'], always(2), obj), {x: {y: 2}, y: {z: 2}, z: 3})
      assert.deepEqual(
        U.updatePath(['x', 'y', 'z'], always(2), obj),
        {x: {y: {z: 2}}, y: {z: 2}, z: 3}
      )
    })
  })

  describe('mergePath', () => {
    it('should do a shallow merge at a given path', () => {
      assert.deepEqual(
        U.mergePath(['x', 'y'],
          {z: {a: 1, b: 2}},
          {x: {y: {z: {a: 2, c: 3}, w: 1}}}),
        {x: {y: {z: {a: 1, b: 2}, w: 1}}})

      assert.deepEqual(
        U.mergePath(['x'],
          {a: 1},
          {x: {a: 2, c: 3}}),
        {x: {a: 1, c: 3}})
    })
  })

  describe('updateIn', () => {
    const obj = {x: {y: {z: 1}}, y: {z: 2}, z: 3}

    it('should provide value and parent, but not root as context', () => {
      // parent always === rootObj for updateIn, this is different from updatePath
      U.updateIn('z', (value, parent, rootObj) => {
        assert.equal(value, 3)
        assert.deepEqual(parent, obj)
        assert.isUndefined(rootObj)
      }, obj)
    })

    it('should set returned value to the object at the given key', () => {
      assert.deepEqual(U.updateIn('z', always(4), obj), {...obj, z: 4})
    })
  })

  describe('mergeIn', () => {
    it('should do a shallow merge at the given key', () => {
      assert.deepEqual(
        U.mergeIn('x',
          {a: 1},
          {x: {a: 2, c: 3}}),
        {x: {a: 1, c: 3}})
    })
  })

  describe('copyProp', () => {
    it('should copy a value from one key to another, leaving the old key intact', () => {
      assert.deepEqual(U.copyProp('x', 'y', {x: 1}), {x: 1, y: 1})
    })
  })

  describe('moveProp', () => {
    it('should move a value from one key to another, removing the old key', () => {
      assert.deepEqual(U.moveProp('x', 'y', {x: 1}), {y: 1})
    })
  })

  describe('fillKeys', () => {
    it('should create an object with the given keys and value', () => {
      assert.deepEqual(U.fillKeys(['x', 'y'], 1), {x: 1, y: 1})
    })
  })

  // Objects

  describe('forEachObj', () => {
    it('should invoke the given function with the correct arguments', () => {
      const obj = {x: 1, y: 2}
      const result = {}

      U.forEachObj((value, key) => {
        result[key] = value
      }, obj)

      assert.deepEqual(result, obj)
    })
  })

  describe('findObjPair', () => {
    it('should find the correct pair in an object', () => {
      assert.deepEqual(U.findObjPair(equals(2), {a: 1, b: 2, c: 3}), ['b', 2])
    })
  })

  describe('findObj', () => {
    it('should find the correct value in an object', () => {
      assert.equal(U.findObj(equals(2), {a: 1, b: 2, c: 3}), 2)
    })
  })

  describe('findObjIndex', () => {
    it('should find the correct key in an object', () => {
      assert.equal(U.findObjIndex(equals(2), {a: 1, b: 2, c: 3}), 'b')
    })
  })

  describe('pickValues', () => {
    it('should return the selected values in the given order', () => {
      assert.deepEqual(U.pickValues(['a', 'c'], {a: 1, b: 2, c: 3}), [1, 3])
    })
  })

  describe('count', () => {
    it('should return the correct length of an object', () => {
      assert.equal(U.count({a: 1, b: 2}), 2)
      assert.equal(U.count({}), 0)
    })
  })

  describe('modifyKeys', () => {
    it('should modify keys of an object without modifying values', () => {
      const value = {x: 1, y: 2}
      const result = U.modifyKeys(key => `$${key}`, value)

      assert.deepEqual(keys(result), ['$x', '$y'])
      assert.equal(result.$x, 1)
      assert.equal(result.$y, 2)
    })
  })

  describe('modifyKeysRecursive', () => {
    it('should modify keys of an object recursively without modifying values', () => {
      const value = {x: 1, y: {z: 2}}
      const result = U.modifyKeysRecursive(key => `$${key}`, value)

      assert.deepEqual(result, {$x: 1, $y: {$z: 2}})
    })

    it('should dig into arrays', () => {
      const value = {x: 1, y: {z: [{w: 2}, {a: 3}]}}
      const result = U.modifyKeysRecursive(key => `$${key}`, value)

      assert.deepEqual(result, {$x: 1, $y: {$z: [{$w: 2}, {$a: 3}]}})
    })

    it('should dig into arrays of non-objects', () => {
      const value = {x: 1, y: {z: ['one', 'two']}}
      const result = U.modifyKeysRecursive(key => `$${key}`, value)

      assert.deepEqual(result, {$x: 1, $y: {$z: ['one', 'two']}})
    })

    it('should dig into nested arrays', () => {
      const value = {x: 1, y: {z: [[{a: 'one', b: 'two'}]]}}
      const result = U.modifyKeysRecursive(key => `$${key}`, value)

      assert.deepEqual(result, {$x: 1, $y: {$z: [[{$a: 'one', $b: 'two'}]]}})
    })
  })

  describe('isObject', () => {
    it('should identify objects', () => {
      assert.isTrue(U.isObject({}))
      assert.isTrue(U.isObject({x: 1}))
    })

    it('should not identify arrays', () => {
      assert.isFalse(U.isObject([]))
      assert.isFalse(U.isObject([1, 2]))

      const a = []
      a.prop = 1

      assert.isFalse(U.isObject(a))
    })
  })

  describe('mapObjPairs', () => {
    it('should identify objects', () => {
      assert.isTrue(U.isObject({}))
      assert.isTrue(U.isObject({x: 1}))
    })

    it('should not identify arrays', () => {
      assert.isFalse(U.isObject([]))
      assert.isFalse(U.isObject([1, 2]))

      const a = []
      a.prop = 1

      assert.isFalse(U.isObject(a))
    })
  })

  describe('argsToObj', () => {
    it('creates an object with any number of arguments', () => {
      assert.deepEqual(U.argsToObj([])(), {})
      assert.deepEqual(U.argsToObj(['x'])(1), {x: 1})
      assert.deepEqual(U.argsToObj(['x', 'y'])(1, 2), {x: 1, y: 2})
      assert.deepEqual(U.argsToObj(['x', 'y', 'z'])(1, 2, 3), {x: 1, y: 2, z: 3})
    })

    it('drops extra arguments', () => {
      assert.deepEqual(U.argsToObj(['x'])(1, 2), {x: 1})
    })

    it('sets missing arguments to undefined', () => {
      assert.deepEqual(U.argsToObj(['x', 'y'])(1), {x: 1, y: undefined})
    })
  })

  describe('incrementProp', () => {
    it('increments the given prop', () => {
      assert.deepEqual(U.incrementProp('x', 3)({x: 1}), {x: 4})
    })

    it('handles a negative increment', () => {
      assert.deepEqual(U.incrementProp('x', -3)({x: 1}), {x: -2})
    })

    it('default increment to 1', () => {
      assert.deepEqual(U.incrementProp('x')({x: 1}), {x: 2})
    })
  })

  // Arrays

  describe('concatAll', () => {
    assert.deepEqual(U.concatAll(), [])
    assert.deepEqual(U.concatAll([[1, 2]]), [1, 2])
    assert.deepEqual(U.concatAll([[1, 2], [3, 4]]), [1, 2, 3, 4])
    assert.deepEqual(U.concatAll([[1, 2], [3, 4], [5, 6]]), [1, 2, 3, 4, 5, 6])
  })

  describe('intersperseWith', () => {
    const value = [1, 2, 'whatever', {}, [], 5]

    it('should provide item and index to given function', () => {
      U.intersperseWith((item, idx) => {
        assert.isDefined(item)
        assert.isTrue(Number.isInteger(idx))
      }, [1])
    })

    it('should intersperse properly', () => {
      assert.deepEqual(intersperse('thing', value), U.intersperseWith(always('thing'), value))
    })
  })

  describe('chunk', () => {
    it('should handle no elements', () => {
      assert.deepEqual(U.chunk(2, []), [])
    })

    it('should handle 1 element with chunkLength = 1', () => {
      assert.deepEqual(U.chunk(2, [1]), [[1]])
    })

    it('should handle an even number of elements with chunkLength = 1', () => {
      assert.deepEqual(U.chunk(2, [1, 2, 3, 4]), [[1, 2], [3, 4]])
    })

    it('should handle an odd number of elements with chunkLength = 1', () => {
      assert.deepEqual(U.chunk(2, [1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
    })

    it('should handle a different chunkLength', () => {
      assert.deepEqual(U.chunk(3, [1, 2, 3, 4]), [[1, 2, 3], [4]])
    })
  })

  describe('invert', () => {
    it('should invert nested arrays properly', () => {
      assert.deepEqual(U.invert([[1, 2], [3, 4]]), [[1, 3], [2, 4]])
    })
  })

  // Types

  describe('is', () => {
    it('should identify arrays', () => {
      assert.equal(U.is('array', []), true)
      assert.equal(U.is('array', [1, 2, 3]), true)
    })

    it('should identify objects, and not arrays as objects', () => {
      assert.equal(U.is('object', {}), true)
      assert.equal(U.is('object', {x: 1, y: 2}), true)
      assert.equal(U.is('object', []), false)
    })

    it('should identify numbers', () => {
      assert.equal(U.is('number', 10), true)
      assert.equal(U.is('number', 1.2), true)
    })

    it('should identify strings', () => {
      assert.equal(U.is('string', ''), true)
      assert.equal(U.is('string', 'hello'), true)
    })

    it('should identify undefined and null', () => {
      assert.equal(U.is('undefined', undefined), true)
      assert.equal(U.is('null', null), true)
    })

    it('should not identify boxed values', () => {
      assert.equal(U.is('string', new String('hello')), false)
      assert.equal(U.is('number', new Number(1)), false)
    })
  })

  describe('isInstance', () => {
    it('should identify instances of builtins', () => {
      assert.equal(U.isInstance(Number, new Number(1)), true)
      assert.equal(U.isInstance(Array, new Array([])), true)
      assert.equal(U.isInstance(Array, []), true)
    })

    it('should identify instances of custom types', () => {
      function T() {
        this.x = 1
      }

      assert.equal(U.isInstance(T, new T()), true)
    })
  })

  describe('initArray', () => {
    it('should populate array with given length using given function', () => {
      assert.deepEqual(U.initArray(3, always(1)), [1, 1, 1])
    })
  })

  // Strings

  describe('ucFirst', () => {
    it('should capitalize the first letter in a string', () => {
      assert.equal(U.ucFirst('hello'), 'Hello')
    })
  })

  describe('snakeToHuman', () => {
    it('should convert a basic string', () => {
      assert.equal(U.snakeToHuman('stuff_and_things'), 'Stuff And Things')
    })
  })

  describe('snakeToCamel', () => {
    it('should convert a basic string', () => {
      assert.equal(U.snakeToCamel('stuff_and_things'), 'stuffAndThings')
    })
  })

  describe('camelToSnake', () => {
    it('should convert a basic string', () => {
      assert.equal(U.camelToSnake('stuffAndThings'), 'stuff_and_things')
    })
  })

  describe('humanToKebab', () => {
    it('should convert a string with multiple spaces', () => {
      assert.equal(U.humanToKebab('Stuff And Things'), 'stuff-and-things')
    })
  })

  // Currency

  describe('formatNumericCurrency', () => {
    it('formats cents correctly', () => {
      assert.equal(U.formatNumericCurrency(1), '0.01')
      assert.equal(U.formatNumericCurrency(20), '0.20')
      assert.equal(U.formatNumericCurrency(100), '1.00')
      assert.equal(U.formatNumericCurrency(101), '1.01')
      assert.equal(U.formatNumericCurrency(2934), '29.34')
    })
  })

  describe('parseNumericCurrency', () => {
    it('parses a currency string to a decimal', () => {
      assert.equal(U.parseNumericCurrency('0.01'), 1)
      assert.equal(U.parseNumericCurrency('1.00'), 100)
      assert.equal(U.parseNumericCurrency('1.01'), 101)
      assert.equal(U.parseNumericCurrency('29.34'), 2934)
      assert.equal(U.parseNumericCurrency('3.'), 300)
    })
  })

  describe('formatCurrency', () => {
    it('formats cents correctly', () => {
      assert.equal(U.formatCurrency(1), '$0.01')
      assert.equal(U.formatCurrency(100), '$1.00')
      assert.equal(U.formatCurrency(101), '$1.01')
      assert.equal(U.formatCurrency(2934), '$29.34')
    })
  })

  describe('parseCurrency', () => {
    it('parses a currency string to a decimal', () => {
      assert.equal(U.parseCurrency('$0.01'), 1)
      assert.equal(U.parseCurrency('$1.00'), 100)
      assert.equal(U.parseCurrency('$1.01'), 101)
      assert.equal(U.parseCurrency('$29.34'), 2934)
    })
  })

  // Percent

  describe('formatNumericPercent', () => {
    it('formats various things', () => {
      assert.equal(U.formatNumericPercent(1), '1')
      assert.equal(U.formatNumericPercent(20), '20')
      assert.equal(U.formatNumericPercent(1.01), '1.01')
      assert.equal(U.formatNumericPercent(2934.86), '2934.86')
      assert.equal(U.formatNumericPercent(-24), '-24')
    })

    it('takes a denominator', () => {
      assert.equal(U.formatNumericPercent(30, {denom: 300}), '10')
    })

    it('takes a precision', () => {
      assert.equal(
        U.formatNumericPercent(10, {denom: 300, precision: 1}),
        '3.3'
      )
      assert.equal(
        U.formatNumericPercent(10, {denom: 300, precision: 5}),
        '3.33333'
      )
    })

    it('trims extra zeroes', () => {
      assert.equal(
        U.formatNumericPercent(30, {denom: 300, precision: 5}),
        '10'
      )
    })
  })

  describe('parseNumericPercent', () => {
    it('parses various things', () => {
      assert.equal(U.parseNumericPercent('1'), 1)
      assert.equal(U.parseNumericPercent('20'), 20)
      assert.equal(U.parseNumericPercent('1'), 1)
      assert.equal(U.parseNumericPercent('2934.89'), 2934.89)
      assert.equal(U.parseNumericPercent('-24'), -24)
    })

    it('takes a denominator', () => {
      assert.equal(U.parseNumericPercent('10', {denom: 300}), 30)
    })

    it('takes a precision', () => {
      assert.equal(U.parseNumericPercent('2934.89', {precision: 1}), 2934.9)
      assert.equal(
        U.parseNumericPercent('3.222222', {denom: 300, precision: 3}),
        9.667
      )
    })
  })

  describe('formatPercent', () => {
    it('formats various things', () => {
      assert.equal(U.formatPercent(1), '1%')
      assert.equal(U.formatPercent(20), '20%')
      assert.equal(U.formatPercent(1.01), '1.01%')
      assert.equal(U.formatPercent(2934.86), '2934.86%')
      assert.equal(U.formatPercent(-24), '-24%')
    })

    it('takes a denominator', () => {
      assert.equal(U.formatPercent(30, {denom: 300}), '10%')
    })

    it('takes a precision', () => {
      assert.equal(U.formatPercent(10, {denom: 300, precision: 5}), '3.33333%')
    })

    it('trims extra zeroes', () => {
      assert.equal(U.formatPercent(30, {denom: 300, precision: 5}), '10%')
    })
  })

  describe('parsePercent', () => {
    it('parses various things', () => {
      assert.equal(U.parsePercent('1%'), 1)
      assert.equal(U.parsePercent('20%'), 20)
      assert.equal(U.parsePercent('1%'), 1)
      assert.equal(U.parsePercent('2934.9%'), 2934.9)
      assert.equal(U.parsePercent('-24%'), -24)
    })

    it('takes a denominator', () => {
      assert.equal(U.parsePercent('10%', {denom: 300}), 30)
    })

    it('takes a precision', () => {
      assert.equal(U.parsePercent('3.222222%', {denom: 300, precision: 3}), 9.667)
    })
  })

  describe('parseFloatString', () => {
    it('parses various things', () => {
      assert.equal(U.parseFloatString(NaN), 0)
      assert.equal(U.parseFloatString('stuff'), 0)
      assert.equal(U.parseFloatString({}), 0)
      assert.equal(U.parseFloatString(3), 3)
      assert.equal(U.parseFloatString(5.8), 5.8)
      assert.equal(U.parseFloatString('12.2'), 12.2)
      assert.equal(U.parseFloatString('12.2.33'), 12.2)
      assert.equal(U.parseFloatString('12.2  '), 12.2)
    })

    it('takes a fallback', () => {
      assert.equal(U.parseFloatString(NaN, 1), 1)
    })
  })

  describe('round', () => {
    it('rounds positive numbers', () => {
      assert.equal(U.round(0, 1.2), 1)
      assert.equal(U.round(1, 1.2), 1.2)
      assert.equal(U.round(1, 1.29), 1.3)
      assert.equal(U.round(0, 1.5), 2)
    })

    it('rounds negative numbers', () => {
      assert.equal(U.round(0, -1.2), -1)
      assert.equal(U.round(1, -1.2), -1.2)
      assert.equal(U.round(1, -1.29), -1.3)
      assert.equal(U.round(0, -1.5), -1)
    })
  })

  describe('wrap', () => {
    it('passes transforms in order and can be unwrapped', () => {
      const value = U.wrap(1)
        .then(v => v + 1)
        .then(v => v * 3)
        .unwrap()

      assert.equal(value, 6)
    })
  })

  describe('parseJsonSafe', () => {
    it('should parse valid json correctly', () => {
      const json = '{"a": ["value", 1, 4]}'

      assert.deepEqual(U.parseJsonSafe(json), {a: ['value', 1, 4]})
    })

    it('should return undefined on failure', () => {
      assert.isUndefined(U.parseJsonSafe('{"a": ["value", GARBELDYGOOK1, 4]}'))
      assert.isUndefined(U.parseJsonSafe({a: 1}))
    })
  })

  describe('enforce', () => {
    it('should do nothing when condition is true', () => {
      assert.doesNotThrow(() => U.enforce(true, 'this shouldn\'t happen'))
    })

    it('should throw an error with the given message when condition is false', () => {
      assert.throws(() => U.enforce(false, 'error message'), /error message/)
    })
  })

  describe('noop', () => {
    it('should do nothing and return nothing', () => {
      assert.equal(U.noop('stuff'), undefined)
    })
  })

  describe('notImplemented', () => {
    it('should throw an error with the given message', () => {
      assert.throws(() => U.notImplemented('stuff')(), 'stuff')
    })
  })

  describe('barcode', () => {
    it('should give a random numeric barcode', () => {
      assert.match(U.barcode(), /\d{12}/)
    })
  })

  describe('resolveAfter', () => {
    it('should resolve with the given argument after given duration', done => {
      const value = 'VALUE'
      let result

      // Give it 5 ms since the event loop isn't fast enough to queue 1ms properly
      U.resolveAfter(10, value).then(resolvedValue => {
        result = resolvedValue
      })

      // Make sure it's actually waiting asynchronously
      setTimeout(() => assert.isUndefined(result), 5)

      // Check that it worked
      setTimeout(() => assert.equal(result, value), 15)

      // We're done
      setTimeout(done, 20)
    })
  })

  describe('throttle', () => {
    it('should resolve with the same value for all listeners', done => {
      const loader = x => x
      const throttledLoader = U.throttle(5, loader)

      throttledLoader(1).then(result => assert.equal(result, 2))
      throttledLoader(2).then(result => assert.equal(result, 2))

      setTimeout(done, 10)
    })

    it('should cancel stale listeners', done => {
      const loader = x => x
      const throttledLoader = U.throttle(5, loader, {cancelStale: true})

      throttledLoader(1).then(() => done('Failed to cancel'))
      throttledLoader(2).then(result => assert.equal(result, 2))

      setTimeout(done, 10)
    })
  })
})
