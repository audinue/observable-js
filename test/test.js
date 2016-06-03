
var observableObject = require('../src').observableObject;

var o = observableObject({});

o.on('change', function(m) {
	console.log(m);
});

o.prop('foo', 1);
o.prop('bar', 2);
o.prop('bar', 2);
o.prop('baz', 3);

var observableArray = require('../src').observableArray;

var a = observableArray([]);

a.on('change', function(m) {
	console.log(m);
});

a.on('append', function(m) {
	console.log(m);
});

a.on('prepend', function(m) {
	console.log(m);
});

a.on('remove', function(m) {
	console.log(m);
});

a.append(1);
console.log(a);

a.prepend(2);
console.log(a);

a.remove(1);
console.log(a);
