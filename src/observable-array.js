
var observableObject = require('./observable-object')

function observableArray (object) {
  if (!(object instanceof Array)) {
    return object
  }
  if (object.isObservableArray) {
    return object
  }
  return Object.defineProperties(observableObject(object), {
    isObservableArray: {
      value: true
    },
    append: {
      value: function (value) {
        object.push(value)
        return object.notify({
          type: 'append',
          value: value
        }).notify({
          type: 'change',
          key: 'length'
        })
      }
    },
    prepend: {
      value: function (value) {
        object.unshift(value)
        return object.notify({
          type: 'prepend',
          value: value
        }).notify({
          type: 'change',
          key: 'length'
        })
      }
    },
    remove: {
      value: function (value) {
        var key = object.indexOf(value)
        if (key === -1) {
          return object
        }
        object.splice(key, 1)
        return object.notify({
          type: 'remove',
          key: key,
          value: value
        }).notify({
          type: 'change',
          key: 'length'
        })
      }
    }
  })
}

module.exports = observableArray
