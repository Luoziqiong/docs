/**
 * 柯里化
 * @param {*} fn 函数
 * @param  {...any} args 给函数的初始参数
 * @returns
 */
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

function sum(a, b) {
  return a + b;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)); // 3
console.log(curriedSum(1, 2)); // 3
console.log(curriedSum(1)(2));
