
function deepClone(obj, map = new WeakMap()) {
  // 如果是null或基础类型直接返回
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  let newObj = Array.isArray(obj) ? [] : {}
  // 处理循环引用
  if (map.has(obj)) {
    return map.get(obj)
  }
  map.set(obj, newObj);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepClone(obj[key], map)
    }
  }
  return newObj;
}

console.log(deepClone({
  a: 1,
  b: [1, 3],
  c: Symbol(12),
  d: function () { console.log(12) },
  e: new Date(),
  f: null,
  ff: undefined
}))
console.log(deepClone([{
  a: 1
}]))