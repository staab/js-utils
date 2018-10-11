/* eslint func-names: 0, no-invalid-this: 0, max-lines: 0, no-undefined: 0 */
import {
  omit, mapObjIndexed, curry, path as getPath, assocPath, merge, binary, when,
  always, zipObj, clone, toPairs, find, nth, keys as getKeys, values as getValues,
  is as ramdaIs, fromPairs, indexBy, sum, pluck, any, map, pipe, split,
  toLower, join, curryN, uniq, equals, prop, concat, replace,
} from 'ramda'

// ============================================================================
// Cardinality

export const isPlural = value => value instanceof Array

export const ensurePlural = value => isPlural(value) ? value : [value]

// ============================================================================
// Paths

export const arrPath = path => is('string', path) ? path.split('.') : path

export const dotPath = path => is('array', path) ? path.join('.') : path

export const updatePath = curry((path, update, obj) => {
  const value = getPath(path, obj)
  const parent = getPath(path.slice(0, -1), obj)

  // Provide the value at the path, the value's immediate parent, and the root
  // object as context
  const result = update(value, parent, obj)

  // Return the entire object with the path changed
  return assocPath(path, result, obj)
})

export const mergePath = curry((path, value, obj) =>
  assocPath(path, merge(getPath(path, obj), value), obj))

// In's are just shortcut versions of paths
export const updateIn = curry((key, update, obj) =>
  updatePath([key], binary(update), obj))

export const mergeIn = curry((key, value, obj) =>
  mergePath([key], value, obj))

export const copyProp = curry((fromKey, toKey, obj) =>
  ({...obj, [toKey]: obj[fromKey]}))

export const moveProp = curry((fromKey, toKey, obj) =>
  omit([fromKey], copyProp(fromKey, toKey, obj)))

export const replaceValues = curry((matchFn, toValue, obj) =>
  mapObjIndexed(when(matchFn, always(toValue)), obj))

export const fillKeys = curry((keys, value) =>
  zipObj(keys, keys.map(() => clone(value))))

export const assocPathMutable = curry((path, value, obj) => {
  const rootObj = obj

  while (path.length > 1) {
    obj[path[0]] = obj[path[0]] || {}
    obj = obj[path[0]]
    path = path.slice(1)
  }

  obj[path[0]] = value

  return rootObj
})

// ============================================================================
// Objects

export const mergeRight = curry((left, right) => ({...right, ...left}))

export const forEachObj = (fn, obj) => toPairs(obj).forEach(([key, value]) => fn(value, key))

export const findObjPair = (fn, obj) => find(([key, value]) => fn(value, key), toPairs(obj))

export const findObj = (fn, obj) => nth(1, findObjPair(fn, obj) || [])

export const findObjIndex = curry((fn, obj) => nth(0, findObjPair(fn, obj) || []))

export const pickValues = curry((keys, obj) => keys.map(key => obj[key]))

export const count = obj => getKeys(obj).length

export const modifyKeys = curry((fn, obj) =>
  zipObj(getKeys(obj).map(fn), getValues(obj)))

export const modifyKeysRecursive = curry((fn, value) => {
  if (ramdaIs(Array, value)) {
    return value.map(modifyKeysRecursive(fn))
  }

  // Only recurse into pojos
  if (!isObject(value) || value.constructor !== Object) {
    return value
  }

  return zipObj(
    getKeys(value).map(fn),
    getValues(value).map(modifyKeysRecursive(fn)))
})

export const isObject = value => ramdaIs(Object, value) && !ramdaIs(Array, value)

export const mapObjPairs = (fn, obj) =>
  fromPairs(toPairs(obj).map(fn))

// Gotta curry this kinda manually since keys/args might have 0 length
export const argsToObj = (keys, ...args) => {
  if (args.length) {
    return fromPairs(keys.map((key, idx) => [key, args[idx]]))
  }

  return (...moreArgs) => fromPairs(keys.map((key, idx) => [key, moreArgs[idx]]))
}

export const objToArgs = curry((keys, obj) => keys.map(key => obj[key]))

export const incrementProp = (key, incr = 1) => value =>
  ({...value, [key]: value[key] + incr})

export const renameProp = curry((fromName, toName, obj) =>
  ({...omit([fromName], obj), [toName]: obj[fromName]}))

export const createMap = curry((key, collection) =>
  indexBy(prop(key), collection || []))

export const createMapOf = curry((key, valueKey, collection) =>
  fromPairs((collection || []).map(item => [item[key], item[valueKey]])))

// ============================================================================
// Arrays

export const first = list => list[0]

export const enumerate = list => list.map((item, idx) => [item, idx])

export const concatAll = (lists = []) => lists.reduce(concat, [])

export const intersperseWith = curry((fn, coll) =>
  coll.reduce((result, item, idx) =>
    result.length ? result.concat([fn(item, idx), item]) : result.concat(item), []))

export const chunk = curry((chunkLength, coll) => {
  const result = []
  let current = []

  coll.forEach(item => {
    if (current.length < chunkLength) {
      current.push(item)
    }

    if (current.length === chunkLength) {
      result.push(current)
      current = []
    }
  })

  if (current.length > 0) {
    result.push(current)
  }

  return result
})

export const invert = nestedArray => {
  const result = []

  nestedArray.forEach((inner, outerIdx) =>
    inner.forEach((value, innerIdx) => {
      result[innerIdx] = result[innerIdx] || []
      result[innerIdx][outerIdx] = value
    }))

  return result
}

export const sumProp = curry((key, coll) => sum(pluck(key, coll)))


// ============================================================================
// Types

export const is = curry((type, value) => {
  // typeof [] === 'object'
  if (isInstance(Array, value)) {
    return type === 'array'
  }

  // typeof null === 'object'
  if (value === null) {
    return type === 'null'
  }

  return typeof value === type
})

export const isInstance = curry((types, value) =>
  any(type => typeof value === 'object' && value instanceof type, ensurePlural(types)))

export const isUuid = value =>
  value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)

export const initArray = (length, init) => map(init, new Array(length))

export const fillArray = (length, item) => map(always(item), new Array(length))

// ============================================================================
// Strings

export const ucFirst = value => value.slice(0, 1).toUpperCase() + value.slice(1)

export const snakeToHuman = pipe(toLower, split('_'), map(ucFirst), join(' '))

export const humanToSnake = value => value.replace(/ /g, '_').toLowerCase()

export const snakeToCamel = value =>
  value.split('_').map((sub, idx) =>
    idx === 0 ? sub : ucFirst(sub.toLowerCase())).join('')

export const camelToSnake = replace(/([A-Z])/g, match => `_${match.toLowerCase()}`)

export const camelToHuman = pipe(camelToSnake, snakeToHuman)

export const humanToKebab = value => value.replace(/ /g, '-').toLowerCase()

export const pluralize = (value, label, pluralLabel) =>
  value === 1 ? label : (pluralLabel || `${label}s`)

export const quantify = (value, label, pluralLabel) =>
  `${value} ${pluralize(value, label, pluralLabel)}`

export const randomId = () => Math.random().toString().slice(2)


// ============================================================================
// Currency

export const formatNumericCurrency = cents => (cents / 100).toFixed(2)

export const parseNumericCurrency = display => Math.round(parseFloatString(display) * 100)

export const formatCurrency = cents =>
  cents >= 0
    ? `$${formatNumericCurrency(cents)}`
    : `-$${formatNumericCurrency(Math.abs(cents))}`

export const parseCurrency = display => parseNumericCurrency(display.replace('$', ''))

// ============================================================================
// Percents

const removeExtraZeroes = num => String(parseFloat(num))

export const formatNumericPercent = (num, {denom = 100, precision} = {}) => {
  let result = num / denom * 100

  if (precision !== undefined) {
    result = result.toFixed(precision)
  }

  return removeExtraZeroes(result)
}

export const parseNumericPercent = (display, {denom = 100, precision} = {}) => {
  let result = parseFloatString(display) / (100 / denom)

  if (precision !== undefined) {
    result = round(precision, result)
  }

  return result
}

export const formatPercent = pipe(formatNumericPercent, value => `${value}%`)

export const parsePercent = (value, ...args) =>
  parseNumericPercent(value.replace('%', ''), ...args)

// ============================================================================
// Numbers

export const parseFloatString = (value, fallback = 0) => {
  if (is('number', value) && !isNaN(value)) {
    return parseFloat(value)
  }

  value = parseFloat(value.toString().replace(parseFloatString.DOT_REGEXP, '.').trim())

  return isNaN(value) ? fallback : value
}

parseFloatString.DOT_REGEXP = new RegExp(/\.+/)

export const parseIntegerString = (value, fallback = 0) =>
  parseInt(parseFloatString(value, fallback), 10)

export const round = (precision, value) =>
  Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)

export const safeDivide = (a, b, precision = 0) =>
  b === 0 ? 0 : round(precision, a / b)

export const clamp = (min, max, value) => Math.max(min, Math.min(max, value))

// ============================================================================
// Promises

export const resolveAfter = curry((duration, value) =>
  new Promise(resolve => setTimeout(() => resolve(value), duration)))

export const resolveWith = fn => (...args) => Promise.resolve(fn(...args))

export const rejectWith = fn => (...args) => Promise.reject(fn(...args))

export const noopPromise = {then: () => noopPromise, catch: () => noopPromise}

export const haltPromiseChain = promise => promise.catch(noop) || noopPromise

export const waitFor = (condition, timeout = 100) => new Promise(resolve => {
  (function tryIt() {
    const result = condition()

    if (result) {
      resolve(result)
    } else {
      setTimeout(tryIt, timeout)
    }
  }())
})

export const throttle = (threshhold, fn, scope = {}) =>
  // Scope can be passed in so we can throttle multiple functions
  // with the same promise

   (...args) => {
    // If there's a timeout, that means there was a previous call. Cancel it.
    clearTimeout(scope.timeout)

    // If there isn't a resolution function, that means any old calls completed
    // _resolve and _promise are shared by all throttled callers so everyone
    // gets the most recent value
    if (!scope.resolve || scope.cancelStale) {
      if (scope.promise) {
        scope.promise.catch(noop)
      }

      scope.promise = new Promise(resolve => {
        scope.resolve = resolve
      })
    }

    // Wait until inputs slow down to call the function
    scope.timeout = setTimeout(() => {
      // Now call the function and resolve with the return value
      scope.resolve(fn(...args))

      // Clear out the resolve function, which indicates there are callers
      // waiting on the most recent result
      scope.resolve = null
      scope.timeout = null
    }, threshhold)

    return scope.promise
  }

// ============================================================================
// Really misc

// Let enums be an array, but also add some properties to access values with
export const defineEnum = values => {
  values.forEach(value => {
    values[value.toUpperCase()] = value
  })

  return values
}

export const definePrefixedEnum = (prefix, values) => {
  values.forEach(value => {
    values[value.toUpperCase()] = `${prefix}${value}`
  })

  return values
}

// A promise-like interface, but sync. For better ramda chaining,
// inspired by clojure's thread macro
export const wrap = value => ({
  then: fn => wrap(fn(value)),
  unwrap: always(value),
})

// Re implement tap to not be auto-curried like in ramda
export const tap = fn => value => {
  fn(value)

  return value
}

export const parseJsonSafe = value => {
  try {
    return JSON.parse(value)
  } catch (err) {
    return undefined
  }
}

export const enforce = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }

  return condition
}

export const noop = always(undefined)

export const apply = (fn, args) => fn(...args)

export const doPipe = (value, fns) => fns.reduce((v, fn) => fn(v), value)

export const notImplemented = message => () => {
  throw new Error(message)
}

export const randInt = () => Math.ceil(Math.random() * 9)

export const barcode = () =>
  initArray(12, randInt).join('')

export const swatch = (value, defaultResult, cases) => {
  const result = cases[value]

  return result === undefined ? defaultResult : result
}

export const withSelf = fn => function (...args) {
  return fn(this, ...args)
}

export const cached = (obj, path, getNewValue) => {
  let value = getPath(path, obj)

  if (value === undefined) {
    value = getNewValue()

    assocPathMutable(path, value, obj)
  }

  return value
}

export const clog = curryN(2, function clog(info, value) {
  /* eslint no-console: 0*/
  enforce(arguments.length === 2, 'Both info and value should be provided to clog')

  console.log(info, value)

  return value
})

export const diffObjs = (obj1, obj2) => {
  const diff = []

  uniq(getKeys(obj1).concat(getKeys(obj2))).forEach(key => {
    if (obj1[key] === undefined && obj2[key] !== undefined) {
      diff.push([`key "${key}" is new in object 2. New value:`, obj2[key]])
    }

    if (obj2[key] === undefined && obj1[key] !== undefined) {
      diff.push([`key "${key}" was removed in object 2. Old value:`, obj1[key]])
    }

    if (!equals(obj1[key], obj2[key])) {
      diff.push([
        `key "${key}" was changed in object 2. Old value: `,
        obj1[key],
        'New value:',
        obj2[key],
      ])
    } else if (obj1[key] !== obj2[key]) {
      diff.push([
        `key "${key}" was changed in object 2 (by identity, but not value)`,
      ])
    }
  })

  return diff
}
