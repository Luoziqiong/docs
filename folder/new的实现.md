```
// 基于原型链的继承

// new操作符内部实现原理
function Person(name) {
  this.name = name
}

let person = new Person('as')
// 相当于
// let person = {}
// person.__proto__ = Person.prototype // 此时便建立了obj对象的原型链： person->Person.prototype->Object.prototype->null
// Person.call(person, 'as')

console.log(person)

function Person2(name) {
  this.name = name;
  return this.name;
}
function Person3(name) {
  this.name = name;
  return new Array();
}
function Person4(name) {
  this.name = name;
  return new String(name);
}
function Person5(name) {
  this.name = name;
  return function() {};
}
var person2 = new Person2('John');  // {name: 'John'}
var person3 = new Person3('John');  // []
var person4 = new Person4('John');  // 'John'
var person5 = new Person5('John');  // function() {}

console.log(person2)
console.log(person3)
console.log(person4)
console.log(person5)

```
