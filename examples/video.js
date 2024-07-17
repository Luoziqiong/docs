
window.onload = () => {
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
}