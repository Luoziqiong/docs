/**
 * 目标：图片懒加载
 *    视频进入可视范围播放，离开可视范围暂停
 * 
 * 实现方案：使用IntersectionObserver实现
 *  带有指定类名的元素则自动去检查与视口的相交情况
 * 
 * 用最原生的方法写如何可以让他在vue和react中使用
 * 
 */

window.onload = () => {
  const elements = document.getElementsByClassName('lazy')
  const elementsLen = Array.from(elements).length

  if (elementsLen === 0) {
    return
  }

  this.observer = new IntersectionObserver(handleImageIntersect, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  })
  for (let i = 0; i < elementsLen; i++) {
    const el = elements[i]
    this.observer.observe(el)
  }
  function handleImageIntersect(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 相交时，显示图片
        entry.target.src = entry.target.attributes['data-src'].value
        // 取消观察
        observer.unobserve(entry.target)
      }
    })
  }
}
