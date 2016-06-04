
var observable = require('./observable')

function observableObject (object) {
  if (!(object instanceof Object)) {
    return object
  }
  if (object.isObservableObject) {
    return object
  }
  return Object.defineProperties(observable(object), {
    isObservableObject: {
      value: true
    },
    prop: {
      value: function (key, value) {
        if (value === undefined) {
          if (key instanceof Object) {
            for (var i in key) {
              object.prop(i, key[i])
            }
            return object
          }
          return object[key]
        }
        if (object[key] !== value) {
          object[key] = value
          object.notify({
            type: 'change',
            key: key
          })
        }
        return object
      }
    }
  })
}

module.exports = observableObject
