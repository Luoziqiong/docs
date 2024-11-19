// 原型链继承
function Parent() {
  this.name = 'ba';
  this.say = function() {
    console.log(this.name);
  }
}
function Child() {
  this.name = 'er';
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;
const child = new Child();
child.say();

// 构造函数继承
function Child1(name) {
  Parent.apply(this, arguments);
  this.name = name;
}
const child1 = new Child1('12');
child1.say();
// 原型式继承
function createObj(o) {
  function F(){}
  F.prototype = o;
  return new F();
}
const child2 = createObj(new Parent());
child2.say();

// 寄生式继承
function Child3(o) {
  let clone = Object.create(o);
  clone.name = '11';
  return clone;
}
const child3 = new Child3(new Parent());
child3.say();