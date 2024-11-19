function myNew(func, ...args) {
  let __obj = {};
  __obj.__proto__ = func.prototype;
  let result = func.call(__obj, ...args)
  return  result instanceof Object ? result : __obj;
}
