
var forEach = require('utility-js').forEach

function observable (object) {
  if (!(object instanceof Object)) {
    return object
  }
  if (object.isObservable) {
    return object
  }
  var observers = {}
  return Object.defineProperties(object, {
    isObservable: {
      value: true
    },
    on: {
      value: function (type, callback) {
        if (observers[type] === undefined) {
          observers[type] = []
        }
        observers[type].push(callback)
        return object
      }
    },
    off: {
      value: function (type, callback) {
        if (type === undefined) {
          observers = {}
          return object
        }
        if (callback === undefined) {
          observers[type] = []
          return object
        }
        if (observers[type] === undefined) {
          return object
        }
        forEach(observers[type], function (value, index) {
          if (value === callback) {
            observers[type].splice(index, 1)
            return false
          }
        })
        return object
      }
    },
    once: {
      value: function (type, callback) {
        var once = function () {
          object.off(type, callback).off(type, once)
        }
        return object.on(type, callback).on(type, once)
      }
    },
    notify: {
      value: function (message) {
        if (observers[message.type] === undefined) {
          return object
        }
        forEach(observers[message.type].slice(0), function (callback) {
          callback(message)
        })
        return object
      }
    }
  })
}

module.exports = observable
