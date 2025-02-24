import { startTypewriter } from '../baseAnimations/index.js'

const selectors = {
  title: '.hero__title',
  desc: '.hero__description',
  number: '.hero__extra-clients-text',
}

function startNumberClimb(selector) {
  const element = document.querySelector(selector)

  const rgx = /\d+/

  const endNumber = parseInt(element.textContent.match(rgx))

  const target = {
    value: 0,
  }

  return {
    targets: target,
    value: endNumber,
    update: () => {
      element.textContent = element.textContent.replace(
        rgx,
        target.value
      )
    },
    easing: 'linear',
    round: 1,
  }
}

export function startHeroAnimations() {
  anime
    .timeline()
    .add(
      startTypewriter(selectors.title, { showCursor: true }),
      '-=300'
    )
    .add(
      startTypewriter(selectors.desc, { showCursor: true }),
      '-=300'
    )
    .add(startNumberClimb(selectors.number), '-=300')
}
