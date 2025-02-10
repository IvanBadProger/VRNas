import { initSlider } from './slider.js'
import { initSolarSystem } from './solar-system-animation.js'
import { initCheckIcon } from './check-icons-animation.js'
import { preloaderStart } from './preloader.js'

const animationNames = {
  solarSystem: 'solar-system',
  checkIconMorph: 'check-icon-morph',
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
}

function observerCallBack(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const animationName = entry.target.getAttribute(
        'data-animation-name'
      )

      switch (animationName) {
        case animationNames.checkIconMorph:
          initCheckIcon()
          observer.unobserve(entry.target)
          break
        case animationNames.solarSystem:
          initSolarSystem()
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

initSlider()
// preloaderStart()
