/* eslint func-names: 0, no-invalid-this: 0, max-lines: 0, no-undefined: 0 */
import R from 'ramda'

// ============================================================================
// Cardinality

export const isPlural = value => value instanceof Array

export const ensurePlural = value => isPlural(value) ? value : [value]

// ============================================================================
// Paths

export const arrPath = path => is('string', path) ? path.split('.') : path

export const dotPath = path => is('array', path) ? path.join('.') : path

export const updatePath = R.curry((path, update, obj) => {
  const value = R.path(path, obj)
  const parent = R.path(path.slice(0, -1), obj)

  // Provide the value at the path, the value's immediate parent, and the root
  // object as context
  const result = update(value, parent, obj)

  // Return the entire object with the path changed
  return R.assocPath(path, result, obj)
})

export const mergePath = R.curry((path, value, obj) =>
  R.assocPath(path, R.merge(R.path(path, obj), value), obj))

// In's are just shortcut versions of paths
export const updateIn = R.curry((key, update, obj) =>
  updatePath([key], R.binary(update), obj))

export const mergeIn = R.curry((key, value, obj) =>
  mergePath([key], value, obj))

export const copyProp = R.curry((fromKey, toKey, obj) =>
  ({...obj, [toKey]: obj[fromKey]}))

export const moveProp = R.curry((fromKey, toKey, obj) =>
  R.omit([fromKey], copyProp(fromKey, toKey, obj)))

export const replaceValues = R.curry((matchFn, toValue, obj) =>
  R.mapObjIndexed(R.when(matchFn, R.always(toValue)), obj))

export const fillKeys = R.curry((keys, value) =>
  R.zipObj(keys, keys.map(() => R.clone(value))))

export const assocPathMutable = R.curry((path, value, obj) => {
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

export const mergeRight = R.curry((left, right) => ({...right, ...left}))

export const forEachObj = (fn, obj) => R.toPairs(obj).forEach(([key, value]) => fn(value, key))

export const findObjPair = (fn, obj) => R.find(([key, value]) => fn(value, key), R.toPairs(obj))

export const findObj = (fn, obj) => R.nth(1, findObjPair(fn, obj) || [])

export const findObjIndex = R.curry((fn, obj) => R.nth(0, findObjPair(fn, obj) || []))

export const count = obj => R.keys(obj).length

export const modifyKeys = R.curry((fn, obj) =>
  R.zipObj(R.keys(obj).map(fn), R.values(obj)))

export const modifyKeysRecursive = R.curry((fn, value) => {
  if (R.is(Array, value)) {
    return value.map(modifyKeysRecursive(fn))
  }

  // Only recurse into pojos
  if (!isObject(value) || value.constructor !== Object) {
    return value
  }

  return R.zipObj(
    R.keys(value).map(fn),
    R.values(value).map(modifyKeysRecursive(fn)))
})

export const isObject = value => R.is(Object, value) && !R.is(Array, value)

export const mapObjPairs = (fn, obj) =>
  R.fromPairs(R.toPairs(obj).map(fn))

// Gotta curry this kinda manually since keys/args might have 0 length
export const argsToObj = (keys, ...args) => {
  if (args.length) {
    return R.fromPairs(keys.map((key, idx) => [key, args[idx]]))
  }

  return (...moreArgs) => R.fromPairs(keys.map((key, idx) => [key, moreArgs[idx]]))
}

export const objToArgs = R.curry((keys, obj) => keys.map(key => obj[key]))

export const incrementProp = (prop, incr = 1) => value =>
  ({...value, [prop]: value[prop] + incr})

export const renameProp = R.curry((fromName, toName, obj) =>
  ({...R.omit([fromName], obj), [toName]: obj[fromName]}))

export const createMap = R.curry((key, collection) =>
  R.indexBy(R.prop(key), collection || []))

export const createMapOf = R.curry((key, valueKey, collection) =>
  R.fromPairs((collection || []).map(item => [item[key], item[valueKey]])))

// ============================================================================
// Arrays

export const first = list => list[0]

export const intersperseWith = R.curry((fn, coll) =>
  coll.reduce((result, item, idx) =>
    result.length ? result.concat([fn(item, idx), item]) : result.concat(item), []))

export const chunk = R.curry((chunkLength, coll) => {
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

export const sumProp = R.curry((prop, coll) => R.sum(R.pluck(prop, coll)))


// ============================================================================
// Types

export const is = R.curry((type, value) => {
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

export const isInstance = R.curry((types, value) =>
  R.any(type => typeof value === 'object' && value instanceof type, ensurePlural(types)))

export const isUuid = value =>
  value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)

export const initArray = (length, initItem) => R.map(initItem, new Array(length))

// ============================================================================
// Strings

export const ucFirst = value => value.slice(0, 1).toUpperCase() + value.slice(1)

export const snakeToHuman = R.pipe(R.toLower, R.split('_'), R.map(ucFirst), R.join(' '))

export const snakeToCamel = value =>
  value.split('_').map((sub, idx) =>
    idx === 0 ? sub : ucFirst(sub.toLowerCase())).join('')

export const camelToSnake = R.replace(/([A-Z])/g, match => `_${match.toLowerCase()}`)

export const camelToHuman = R.pipe(camelToSnake, snakeToHuman)

export const humanToKebab = value => value.replace(' ', '-').toLowerCase()

export const pluralize = (value, label, pluralLabel) =>
  value === 1 ? label : (pluralLabel || `${label}s`)

export const quantify = (value, label, pluralLabel) =>
  `${value} ${pluralize(value, label, pluralLabel)}`

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

export const formatNumericPercent = (num, denom = 100, precision = 1) =>
  removeExtraZeroes((num / denom * 100).toFixed(precision))

export const parseNumericPercent = (display, denom = 100, precision = 1) =>
  round(precision, parseFloatString(display) / (100 / denom))

export const formatPercent = R.pipe(formatNumericPercent, value => `${value}%`)

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

// ============================================================================
// Promises

export const resolveAfter = R.curry((duration, value) =>
  new Promise(resolve => setTimeout(() => resolve(value), duration)))

export const resolveWith = fn => (...args) => Promise.resolve(fn(...args))

export const rejectWith = fn => (...args) => Promise.reject(fn(...args))

export const noopPromise = {then: () => noopPromise, catch: () => noopPromise}

export const haltPromiseChain = promise => promise.catch(noop) || noopPromise

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
  unwrap: R.always(value),
})

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

export const noop = R.always(undefined)

export const notImplemented = message => () => {
  throw new Error(message)
}

export const randInt = () => Math.ceil(Math.random() * 9)

export const barcode = () =>
  initArray(12, randInt).join('')

export const withSelf = fn => function (...args) {
  return fn(this, ...args)
}

export const throttle = (threshhold, fn, scope = {}) =>
  // Scope can be passed in so we can throttle multiple functions
  // with the same promise

   (...args) => {
    // If there's a timeout, that means there was a previous call. Cancel it.
    if (scope.timeout) {
      clearTimeout(scope.timeout)
    }

    // If there isn't a resolution function, that means any old calls completed
    // _resolve and _promise are shared by all throttled callers so everyone
    // gets the most recent value
    if (!scope.resolve) {
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


export const cached = (obj, path, getNewValue) => {
  let value = R.path(path, obj)

  if (value === undefined) {
    value = getNewValue()

    assocPathMutable(path, value, obj)
  }

  return value
}

export const clog = R.curryN(2, function clog(info, value) {
  /* eslint no-console: 0*/
  enforce(arguments.length === 2, 'Both info and value should be provided to clog')

  console.log(info, value)

  return value
})

export const diffObjs = (obj1, obj2) => {
  const diff = []

  R.uniq(R.keys(obj1).concat(R.keys(obj2))).forEach(key => {
    if (obj1[key] === undefined && obj2[key] !== undefined) {
      diff.push([`key "${key}" is new in object 2. New value:`, obj2[key]])
    }

    if (obj2[key] === undefined && obj1[key] !== undefined) {
      diff.push([`key "${key}" was removed in object 2. Old value:`, obj1[key]])
    }

    if (!R.equals(obj1[key], obj2[key])) {
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
