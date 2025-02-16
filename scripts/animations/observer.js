import {
  startPartners,
  startCheckIconMorph,
  startPreloader,
  startSolarSystem,
  startHeroAnimations,
} from './sectionAnimations/index.js'
import { VRAnimation } from './model/VRAnimation.js'

/**
 * @param {VRAnimation[]} arr
 * @param {string} animationName
 */
const searchAnimation = (arr, animationName) => {
  return arr.find((item) => item.name === animationName)
}

/**
 * @param {{name: string, func: () => void}[]} arr
 * @returns {VRAnimation[]}
 */
const initializeVRAnimations = (arr) => {
  const VRAnimations = []

  arr.forEach(({ name, func }) => {
    VRAnimations.push(new VRAnimation(name, func))
  })

  return VRAnimations
}

const animations = [
  { name: 'solar-system', func: startSolarSystem },
  { name: 'check-icon-morph', func: startCheckIconMorph },
  { name: 'partners', func: startPartners },
  { name: 'hero', func: startHeroAnimations },
]
const VRAnimations = initializeVRAnimations(animations)

function observerCallBack(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const animationName = entry.target.getAttribute(
        'data-animation-name'
      )

      searchAnimation(VRAnimations, animationName)?.start()
      observer.unobserve(entry.target)
    }
  })
}

const observerSettings = {
  rootMargin: '100px',
  threshold: 0.5,
}

const subscribe = (arr, observer) => {
  arr.forEach((item) => {
    observer.observe(item.trigger)
  })
}

export function startObserver() {
  const observer = new IntersectionObserver(
    observerCallBack,
    observerSettings
  )

  subscribe(VRAnimations, observer)
}
