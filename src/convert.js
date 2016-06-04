
var observableObject = require('./observable-object')
var observableArray = require('./observable-array')

function convert (object) {
  if (object instanceof Array) {
    return observableArray(object)
  }
  return observableObject(object)
}

module.exports = convert
