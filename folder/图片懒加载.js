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

(function () {
  const elements = document.getElementsByClassName('lazy')
  const elementsLen = elements.length
  if (elementsLen === 0) {
    return
  }
  this.observer = new IntersectionObserver(handleImageIntersect, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  })

  for (let i = 0; i < elementsLen; i++) {
    const el = elements[i]
    this.observer.observe(el)
  }
  function handleImageIntersect(entries, observer) {
    entries.forEach(element => {
      if (element.isIntersecting) {
        // 相交时，显示图片
        element.src = element.attributes['data-src'].value
        observer.unobserve(entry.target)
      }
    })
  }
}())

(function () {
  const elements = document.getElementsByClassName('toggle-video')
  const elementsLen = elements.length
  if (elementsLen === 0) {
    return
  }
  this.observer = new IntersectionObserver(handleVideoIntersect, {
    root: null,
    rootMargin: '0px',
    threshold: 0.7
  })

  for (let i = 0; i < elementsLen; i++) {
    const el = elements[i]
    this.observer.observe(el)
  }
  function handleVideoIntersect(entries, observer) {
    entries.forEach(element => {
      if (element.isIntersecting) {
        // 延迟1秒播放，如果用户没在页面停留则不会播放视频
        this.timer = setTimeout(() => {
          element.target.play()
        }, 1000)
      } else {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        element.target.pause()
      }
    })
  }
}())