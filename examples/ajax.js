/**
 *
 * @param {*} config
 * @returns
 */
function request(config) {
  const { url, method, data, params, headers = {} } = config;
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
    const paramString = getParamsString(params);
    let finalUrl = url;
    if (method.toLowerCase() === 'get' && paramString) {
      finalUrl = url.indexOf('?') !== -1 ? url + `&${paramString}` : url + `?${paramString}`;
    }
    xhr.open(method, url);
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.onreadystatechange(() => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    });
    xhr.send(data);
  });
}

function getParamsString(params) {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }
  return Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
}
