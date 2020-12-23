## 一、JavaScript 基础

### 变量和类型

1. JavaScript 规定了几种语言类型

原始类型：number, string, boolean, null, undefined, Symbol (BigInt es10 新增)
引用类型：object

2. JavaScript 对象的底层数据结构是什么
   栈 堆

3. Symbol 类型在实际开发中的应用、可手动实现一个简单的 Symbol
   Symbol 的特点：1、独一无二 2、不可枚举 3、原始类型，不能用 new 去声明

- 防止 XSS
  在 React 中 ReactElement 都有用一个`$$typeof`属性，他是一个 Symbol 对象。他可以达到这个原因是，Symbol 对象无法存储在 JSON 字符串中，那么外部拿到的这种字符串就没有这个标识，无法以 DOM 的形式渲染，避免了 XSS 的攻击。

  但是使用 dangerouslySetInnerHTML 属性时还是有风险的。

- 私有属性
  借助 Symbol 类型的不可枚举，我们可以在类中模拟私有属性，控制变量读写。
- 防止属性污染
  在某些情况下，我们可能要为对象添加一个属性，此时就有可能造成属性覆盖，用 Symbol 作为对象属性可以保证永远不会出现同名属性。
  我们需要在某个对象上临时调用一个方法，又不能造成属性污染，Symbol 是一个很好的选择

4. JavaScript 中的变量在内存中的具体存储形式
   内存分为栈内存和堆内存。
   栈内存：大小固定，存储空间较小。
   堆内存：大小不定，存储空间大。

基础类型在声明时，会在栈内存中为其开辟一块空间存放他的值。
引用类型则是，在栈内存中存储值所在的堆内存的地址，值存储在堆内存中。

5. 基本类型对应的内置对象，以及他们之间的装箱拆箱操作
   number -> Number
   string -> String
   boolean -> Boolean

   在一个值，比如字符串调用 toString()方法时，就发生了装箱和拆箱的过程。
   js 会在内部生成一个该字符串的包装对象；
   调用包装对象上的 toString()方法；
   销毁包装对象；

6. 理解值类型和引用类型

值类型变量赋值时直接给的是那个值
引用类型指向的是地址
在进行函数参数传递的时候，值是一个拷贝的值，引用是地址的浅拷贝，因此可以实现修改引用类型内部值的修改

7. null 和 undefined 的区别
   一个对象被人为的置 null, 这个对象是存在的，但值是空的
   而 undefined 表示一个对象不不存在，就是连声明都可能没有声明过

需要 undefined 这种类型的原因是因为 javascript 是一门动态语言，只有在执行的时候才会知道这个值是否存在，不像强类型语言有编译过程，可以在编译阶段发现错误。

8. 至少可以说出三种判断 JavaScript 数据类型的方式，以及他们的优缺点，如何准确的判断数组类型

typeof // 简洁， 可判断的类型比较少

instanceof // 可判断是否是其原型链上任意一个父类的子类， 不准确

Object.prototype.toString() // 准确

9. 可能发生隐式类型转换的场景以及转换原则，应如何避免或巧妙应用

转换原则(`toPrimitive` 原则) 如果自己写了 Symbol.toPrimitive 方法，则优先调用该方法
1、转 `Number`
优先调用 `valueOf`, 没有再调用 `toString`
2、转 `String`
优先调用 `toString`, 没有再调用 `valueOf`

1、判断语句或逻辑语句
判为 false 的, 有 false, 0, '', null, undefined, NaN
其余都判断为 true

2、+-/\*运算
-/\* 都将非 `Number` 类型转换为 `Number` 类型

+运算时

- 如果一侧为`String`类型，则判断为字符串拼接，会优先将另一侧转换为字符串类型
- 如果一侧为`Number`类型，另一侧为原始类型，将原始类型转换为 `Number` 进行计算
- 如果一侧为`Number`类型，另一侧为引用类型，将两者都转换为字符串进行拼接

3、==
和 `Number` 类型比较
都最终转成 `Number` 可有的值进行判断

引用类型按 `toPrimitive` 原则转换成原始类型

10. 出现小数精度丢失的原因，JavaScript 可以存储的最大数字、最大安全数字，JavaScript 处理大数字的方法、避免精度丢失的方法

原因：JS 内部存储数字会转换成二进制格式存储，以 1 位符号位，11 位指数位， 52 位数字位，的形式进行存储。
运算的时候是做二进制加法，然后转换为十进制，存储位数的限制，会发生计算时，出现超出位数要进行舍入的情况，因此造成了精度丢失。

最大数字 1.11.. \* 2 ^ 1023 1.7976931348623157e+308 NUMBER.MAX_VALUE
最大安全数字 NUMBER.MAX_SAFE_VALUE 1.11... \* 2 ^ 52 9007199254740991

引入了 BigInt 类型

### 原型和原型链

1. 理解原型设计模式以及 JavaScript 中的原型规则

原型模式：指原型实例指向创建对象的种类，并通过拷贝这些原创创建新的对象，是一种用来创建对象的模式，也就是一个对象作为另一个对象的`prototype`属性

原型规则：

- 所有引用类型（数组、对象、函数），都具有对象特征，即可自由扩展属性；
- 所有引用类型，都有一个`__proto__`属性（隐式类型），属性值是一个普通对象；
- 所有函数，都具有一个`prototype`属性（显式类型），属性值也是一个普通原型；
- 所有的引用类型（数组、对象、函数），其隐式原型指向其构造函数的显式原型；
  `(obj.__proto__ === obj.prototype)`
- 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的`__proto__`(即它的构造函数的 prototype)中去寻找；

2. instanceof 的底层实现原理，手动实现一个 instanceof

- js 中为了实现继承，每个对象都有一个`__proto__`, 指向其上个原型
- 2、函数对象会有一个 `prototype`，
- 3、所以就可以通过原型链去判断某个类型是否在其原型链上。

```

function instanceof(obj, parent) {
  let _obj = obj
  while (_obj.__proto__) {
    if (_obj.__proto__ === parent.prototype) {
      return true
    }
    _obj = _obj.__proto__
  }
  return false
}

```

4. 实现继承的几种方式以及他们的优缺点

### 继承

```
function Animal(name) {
  this.name = name || '动物';
  this.eat = function() {
    console.log(this.name + '在吃饭');
  }
}
Animal.prototype.run = function() {
  console.log('running...')
}
```

### 原型链继承

将父类的实例作为子类方法的原型

```
function Cat(name) {
  this.name = name || '喵咪';
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat; // 手动修正构造函数

```

特点： 实现简简洁；
缺点：

- 无法给父类传参；
- 只能在继承语句之后对父类内的值进行修改；
- 所有子类实例共享父类上的属性和方法

### 构造函数继承

没有用到原型链，将父类的方法复制一份给子类；

```
function Cat(name) {
  Animal.apply(this, arguments);
  this.name = name || 'cat';
}
```

缺点：

- 无法调用父类原型上的方法；
- 原型链上没有父类的原型,因此使用 instanceof 会返回 false；
- 每声明一个子类实例都会生成一份父类内部属性，性能差；

### 组合继承

```
function Cat(name) {
  Animal.apply(this, arguments);
  this.name = name || 'cat';
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;

```

特点:
1、融合了原型链继承和构造函数的优点。

缺点：
1、融合了原型链继承和构造函数的缺点。

### 原型式继承

模拟 Object.create 的实现。将传入的对象作为创建的对象的原型。

```
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

缺点：1、引用类型的属性值始终都会共享相应的值

### 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象

```
function createObj(o) {
  var clone = Object.create(o);
  clone.sayName = function () {
    console.log('hi');
  }
  return clone;
}
```

缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

### 寄生组合式继承

```
function Cat(name) {
  Animal.apply(this, argument);
  this.name = name
}

function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    let prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 关键的三步
// let F = function () {};
// F.prototype = Animal.prototype;
// Cat.prototype = new F();

prototype(Cat, Animal);
```

缺点：会调用两次父构造函数

5. 至少说出一种开源项目(如 Node)中应用原型继承的案例

6. 可以描述 new 一个对象的详细过程，手动实现一个 new 操作符

```
let obj = new Object('as')
let obj = {}
obj.__proto__ = Object.prototype
Object.call(obj, 'as')
```

7. 理解 es6 class 构造以及继承的底层实现原理

使用了寄生组合式继承

### 作用域和闭包

1. 理解词法作用域和动态作用域

# JavaScript 作用域与作用域链

## 作用域（Scope）

1. 什么是作用域?
   作用域指的是你有权访问的变量， 对象， 函数的集合。作用域决定了你代码区块中变量和其他资源的可见性。
   作用域最大的用处是隔离变量，不同作用域下面的同名变量不会有冲突。

2. 全局作用域与函数作用域

- 全局作用域

  在代码中任何地方都能访问到的对象拥有全局作用域。比如最外层函数，最外层变量。

  `window`对象的内置属性拥有全局作用域。

- 函数作用域

  函数作用域，是指在函数内部声明的变量函数的集合。只有在该函数内部才可以访问到。

  内层作用域可以访问外层作用域，反之则不行。

  块语句不会创建新的作用域。在块语句中定义的变量将保留他们已经存在的作用域中。

3. 块级作用域
   块级作用域可通过新增命令`let`和`const`声明， 所声明的变量在指定块的作用域外无法被访问。块级作用域在如下情况被创建：

- 在一个函数的内部
- 在一个代码块（由一对花括号包裹）内部

4. 作用域链
   > 作用域链本质上是一个指向当前环境与上层环境的一系列变量对象的指针列表（它只引用但不实际包含变量对象），作用域链保证了当前执行环境对符合访问权限的变量和函数的有序访问。

在一个作用域中访问一个变量，如果这个变量没有在该作用域声明，此时就会往该作用域的上一级作用域（即创建该函数的作用域）去找。取到的值为离自己最近的作用域里的值。

这样就形成了一个链式结构。

## 上下文（Context）

1. 什么是上下文？
   当代码运行时，会产生一个对应的执行环境，在这个环境中，所有变量会被事先提出来（变量提升），有的直接赋值，有的为默认值`undefined`，代码从上往下执行，就叫做执行上下文。

JS 中有三种运行环境：

- 全局环境：代码首先进入的环境
- 函数环境：函数被调用时执行的环境
- `eval`函数

执行上下文栈会存储执行环境，执行全局代码是，全局环境首先会被压入栈中，之后执行到函数时，会向栈中压入一个函数的上下文环境，执行完毕则被退出上下文栈。函数每被执行一次就会创建一个执行上下文然后入栈。

- 执行上下文生命周期

  1. 创建阶段

     (1) 生成变量对象

     (2) 建立作用域链

     (3) 确认`this`指向

  2. 执行阶段

     (1) 变量赋值

     (2) 函数引用

     (3) 执行其他代码

  3. 销毁阶段

     执行完毕出栈, 等待回收被销毁

2. 上下文与作用域的关系？
   `JavaScript`代码执行过程分为两个阶段：

- 代码解释阶段：由编译器完成，将代码翻译成可执行代码。
- 代码执行阶段：有引擎完成，主要任务是执行可执行代码。

解释阶段

- 词法分析
- 语法分析
- 作用域规则确定

执行阶段

- 创建执行上下文
- 执行函数代码
- 垃圾回收

作用域在函数定义时被确定，执行上下文是在函数执行之前创建的。

作用域和执行上下文之间最大的区别是： **执行上下文在运行时确定，随时可能改变；作用域在定义时就确定，并且不会改变。**

## 参考文章

[深入理解 JavaScript 作用域和作用域链](https://juejin.im/post/6844903797135769614#heading-2)
[执行上下文及其生命周期](https://www.jianshu.com/p/a6e8d2bf1ca0)

2. 理解`JavaScript`的作用域和作用域链

3. 理解`JavaScript`的执行上下文栈，可以应用堆栈信息快速定位问题

4. `this`的原理以及几种不同使用场景的取值

5. 闭包的实现原理和作用，可以列举几个开发中闭包的实际应用

6. 理解堆栈溢出和内存泄漏的原理，如何防止

7. 如何处理循环的异步操作

8. 理解模块化解决的实际问题，可列举几个模块化方案并理解其中原理

### 执行机制

1. 为何`try`里面放`return，finally`还会执行，理解其内部机制

2. `JavaScript`如何实现异步编程，可以详细描述`EventLoop`机制

3. 宏任务和微任务分别有哪些

4. 可以快速分析一个复杂的异步嵌套逻辑，并掌握分析方法

5. 使用`Promise`实现串行

6. `Node`与浏览器`EventLoop`的差异

7. 如何在保证页面运行流畅的情况下处理海量数据

### 语法和 API

1. 理解`ECMAScript`和`JavaScript`的关系

2. 熟练运用`es5、es6`提供的语法规范，

3. 熟练掌握`JavaScript`提供的全局对象（例如`Date、Math`）、全局函数（例如`decodeURI、isNaN`）、全局属性（例如`Infinity、undefined`）

4. 熟练应用`map`、`reduce`、`filter` 等高阶函数解决问题

5. `setInterval`需要注意的点，使用`settimeout`实现`setInterval`

6. `JavaScript`提供的正则表达式 API、可以使用正则表达式（邮箱校验、URL 解析、去重等）解决常见问题

7. `JavaScript`异常处理的方式，统一的异常处理方案
