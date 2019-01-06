var greet1 = function (msg, name) {
  console.log(msg + ' ' + name);
}
var greet2 = function (msg, name1, name2) {
  console.log(msg + ' ' + name1 + ' and ' + name2);
}

var sayHello = greet1.bind(null, 'Hello');
var sayHi2Two = greet2.bind(null, 'Hi')

sayHello('Joe');
sayHello('Raj');
sayHello('Kim')

sayHi2Two('Jack', 'Jill');
sayHi2Two('Tom', 'Jerry')