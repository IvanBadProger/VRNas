import { initSlider } from './slider.js'
import { initSolarSystem } from './solar-system-animation.js'
import { startCheckIconMorph } from './check-icons-animation.js'
import { initPartners } from './partners.js'
import { preloaderStart } from './preloader.js'
import { initAccordions } from './accordion.js'

const animationNames = {
  solarSystem: 'solar-system',
  checkIconMorph: 'check-icon-morph',
  partners: 'partners',
}

/**
 * Объект с элементами-триггерами, при видимости которых должны срабатывать соответствующие анимации
 */
const animationTriggers = {
  solarSystem: document.querySelector(
    `[data-animation-name=${animationNames.solarSystem}]`
  ),
  checkIcon: document.querySelector(
    `[data-animation-name=${animationNames.checkIconMorph}]`
  ),
  partners: document.querySelector(
    `[data-animation-name=${animationNames.partners}]`
  ),
}

function observerCallBack(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const animationName = entry.target.getAttribute(
        'data-animation-name'
      )

      switch (animationName) {
        case animationNames.checkIconMorph:
          startCheckIconMorph()
          observer.unobserve(entry.target)
          break
        case animationNames.solarSystem:
          initSolarSystem()
          observer.unobserve(entry.target)
          break
        case animationNames.partners:
          initPartners()
          observer.unobserve(entry.target)
          break

        default:
          break
      }
    }
  })
}

const observerSettings = {
  rootMargin: '100px',
  threshold: 0.5,
}

/**
 * Экземпляр класса IntersectionObserver, необходимый для реагирования на события появления
 * определенных элементов DOM в пределах видимости пользователя
 *
 * @note если интересно, можно почитать про Intersection Observer API
 */
const observer = new IntersectionObserver(
  observerCallBack,
  observerSettings
)

/**
 * Подписка на отслеживание определенных элементов DOM
 */
observer.observe(animationTriggers.checkIcon)
observer.observe(animationTriggers.solarSystem)
observer.observe(animationTriggers.partners)

initSlider()
initAccordions()
// preloaderStart()
