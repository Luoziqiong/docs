// 洋葱模型
function handleNext(middlewares) {
  const n = middlewares.length;
  const next = new Array(n);
  next[n - 1] = () => Promise.resolve();
  for (let i = n - 1; i > 0; i--) {
    next[i - 1] = () => middlewares[i](next[i]);
  }
  middlewares[0](next[0]);
}

async function wrap1(next) {
  console.log('1');
  await next();
  console.log('1 end');
}
async function wrap2(next) {
  console.log('2');
  await next();
  console.log('2 end');
}
async function wrap3(next) {
  console.log('3');
  await next();
  console.log('3 end');
}
const middlewares = [wrap1, wrap2, wrap3];
handleNext(middlewares);
