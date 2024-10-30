/**
 *
 * @param {*} params
 * @returns
 */
function jsonp({ url, params, callbackName }) {
  function generatorUrl() {
    let queries = [`callback=${callbackName}`];
    Object.keys(params).forEach(key => {
      queries.push(`${key}=${params[key]}`);
    });
    return url + '?' + queries.join('&');
  }
  return new Promise(resolve => {
    const scriptEl = document.createElement('script');
    scriptEl.src = generatorUrl();
    document.body.appendChild(scriptEl);
    window[callbackName] = data => {
      resolve(data);
      document.removeChild(scriptEl);
    };
  });
}
