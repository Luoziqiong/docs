### 1. 多种方式实现`扁平化`对比优缺点
1. flat函数
1. 使用concat和apply组合
    ```
    [].concat.apply([],arr)
    ```
2. 使用reduce和concat组合
    ```
    arr.reduce((pre, cur)=> pre.concat(cur));
    ```
3. for循环
    ```
    // 将二维数组展开成一维数组
    function flat = (arr) => {
      let newArr = [], len = arr.length;
      for(let i = 0; i < len; i++) {
        newArr.concat(arr[i])
      }
      return newArr
    }
    ```
### 2. 多种方式实现深拷贝、对比优缺点

- 第一种： JSON.stringify 和 JSON.parse
  JSON.parse(JSON.stringify())

缺点：其他引用类型、拷贝函数、循环引用等情

- 第二种：自己实现

```
function deepClone(obj, map = new WeakMap()) {
  // 如果是null或基础类型直接返回
  if (obj === null || typeof obj !== 'object') return obj

  let newObj = Array.isArray(obj) ? [] : {}
  if (map.has(obj)) {
    return map.get(obj)
  }
  map.set(obj, newObj)

  Object.keys(obj).forEach(key => {
    newObj[key] = deepClone(obj[key], map)
  })
  return newObj
}
```

### 3. 手写函数柯里化工具函数、并理解其应用场景和优势

```
function curry(fn, ...args) {
  const len = fn.length;
  return function () {
    const _args = [...args, ...arguments];
    if (_args.length < len) {
      return curry.call(this, fn, ..._args);
    } else {
      return fn.apply(this, _args);
    }
  };
}
```

### 4. 手写函数防抖节流工具函数、并理解其内部原理和应用场景

节流

```
function throttle(fn, time) {
  let timer = null
  return function() {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, time)
  }
}
```

防抖

```
function debounce(fn, time) {
  let timer = null
  return function() {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}
```

### 5. 实现一个`sleep`函数

```
//Promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}
sleep(1000).then(()=>{
  console.log(1)
})

//Generator
function* sleepGenerator(time) {
  yield new Promise(function(resolve,reject){
    setTimeout(resolve,time);
  })
}
sleepGenerator(1000).next().value.then(()=>{console.log(1)})

//async
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}
async function output() {
  let out = await sleep(1000);
  console.log(1);
  return out;
}
output();

//ES5
function sleep(callback, time) {
  if(typeof callback === 'function')
    setTimeout(callback, time)
}

function output(){
  console.log(1);
}
sleep(output, 1000);
```
