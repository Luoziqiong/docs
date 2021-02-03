### 1. 浏览器提供的符合`W3C`标准的`DOM`操作`API`、浏览器差异、兼容性
### 2. 浏览器提供的浏览器对象模型（`BOM`）提供的所有全局`API`、浏览器差异、兼容性
### 3. 大量`DOM`操作，海量数据的性能优化（合并操作、`Diff`、`requestAnimationFrame`等）
使用createDocumentFragment
使用innerHTML
dom渲染使用requestAnimationFrame进行优化

### 4. 浏览器海量数据存储、操作性能优化
### 5. DOM 事件流的具体实现机制、不同浏览器的差异、事件代理
### 6. 前端发起网络请求的几种方式及其底层实现原理，可以手写原生`ajax`，`fetch`，可以熟练使用第三方库
### 7. 浏览器的同源策略，如何避免同源策源，几种方式的异同点以及如何选型

- 同源策略：协议+域名+端口 三者相同，则认为是同源

### 8. 浏览器提供的几种存储机制、优缺点、开发中的正确的选择

cookie
localStorage/sessionStorage
IndexedDB

### 9. 浏览器跨标签通信
onstorage
websocket
定时器 + 存储数据
SharedWorker
### 10. 浏览器内核
    IE: trident 内核
    Firefox：gecko 内核
    Safari：webkit 内核
    Opera：以前是 presto 内核，Opera 现已改用 Google Chrome 的 Blink 内核
    Chrome：Blink(基于 webkit，Google 与 Opera Software 共同开发)
