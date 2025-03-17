import { SectionAnimation } from './SectionAnimation.js'
import { MESSAGES } from '../config/constants.js'

export class AnimationsObserver {
  #observer
  #observerConfig = AnimationsObserver.defaulObserverConfig
  /**
   * @private @property {SectionAnimation[]} animations
   */
  #animations = []

  static defaulObserverConfig = {
    threshold: 0.5,
    rootMargin: '150px',
  }

  constructor(userObserverConfig = {}) {
    this.#observerConfig = {
      ...this.#observerConfig,
      ...userObserverConfig,
    }

    this.#observer = new IntersectionObserver(
      this.handleIntersection,
      this.#observerConfig
    )
  }

  get animations() {
    return [...this.#animations]
  }

  /**
   * @param {SectionAnimation} animation
   */
  register(animation) {
    if (!animation.baseElement) {
      throw new Error(MESSAGES.BASE_ELEMENT_REQUIRED)
    }

    if (!animation instanceof SectionAnimation) {
      throw new Error(MESSAGES.INSTANCEOF_BASE_ANIMATION)
    }

    this.#animations.push(animation)

    this.#observer.observe(animation.baseElement)
  }

  handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animationName = entry.target.dataset.animationName
        const targetAnimation = this.animations.find(
          (item) => item.animationName === animationName
        )

        targetAnimation.start()
        this.#observer.unobserve(targetAnimation.baseElement)
      }
    })
  }
}
