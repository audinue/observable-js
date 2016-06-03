
var observable = require('../observable').observable;

var o = observable({});

function foo(e) {
	console.log(e);
}

o
	.on('foo', foo)
	.notify({type: 'foo'})
	.off('foo', foo)
	.notify({type: 'foo'});
