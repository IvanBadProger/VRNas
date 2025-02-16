export const startTypewriter = (selector) => {
  const target = document.querySelector(selector)
  const text = target.textContent
  target.textContent = ''

  const typewriteerAnimate = {
    targets: target,
    duration: 3000,
    update: (anime) => {
      const progress = (anime.progress / 100) * text.length

      target.textContent = text.substring(0, progress)
    },
  }

  return typewriteerAnimate
}
