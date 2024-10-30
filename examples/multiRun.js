function multiRun(options) {
  const { arr, fn, num, after } = options;
  const innerArr = [...arr];
  let i = num;
  let running = 0;
  const result = [];
  return new Promise((resolve, reject) => {
    function done(res) {
      running -= 1;
      result.push(res);
      if (innerArr.length > 0) {
        fn(innerArr.shift())
          .then(done)
          .then(after)
          .catch(err => reject(err));
      } else if (running === 0) {
        resolve(result);
      }
    }
    while (i > 0 && innerArr.length) {
      i -= 1;
      running += 1;
      fn(innerArr.shift())
        .then(done)
        .then(after)
        .catch(err => reject(err));
    }
  });
}
