function asyncToGenerator(generatorFunc) {
  return function (...args) {
    const gen = generatorFunc.apply(this, args);
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let genResult;
        try {
          genResult = gen[key](arg);
        } catch (err) {
          return reject(err);
        }
        const { value, done } = genResult;
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            val => step('next', val),
            err => step('throw', err),
          );
        }
      }
      step('next');
    });
  };
}
const getData = (num) => new Promise((resolve) => setTimeout(() => {
    resolve('data'+num);
}, 1000));

function* testG(num) {
  const data = yield getData(num);
  const data1 = yield getData(num);
  return 'success';
}

asyncToGenerator(testG)().then(res => console.log(res));