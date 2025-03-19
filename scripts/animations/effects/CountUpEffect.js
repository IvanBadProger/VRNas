import { BaseEffect } from '../core/BaseEffect.js'

export class CountUpEffect extends BaseEffect {
  #findNumberRegex = /\d+/
  #state = { value: 0 }
  #endValue
  #targetElement
  _animationConfig = CountUpEffect.defaultConfig

  static defaultConfig = {
    targets: undefined,
    value: undefined,
    update: () => {},
    easing: 'linear',
    round: 1,
  }

  /**
   *
   * @param {string} selector - селектор элемента, на котором сработает эффект
   * @param {number} startValue - начальное состояние эффекта
   * @param {Object} config - настройки эффекта, отличные от стандартных
   */
  constructor({ selector, startValue = 0, config = {} }) {
    super()
    this.#targetElement = document.querySelector(selector)
    this.#state.value = startValue
    this.#endValue = this.#getNumberOfElement(
      this.#targetElement
    )

    this.#setAnimationConfig(config)
  }

  #getNumberOfElement(element) {
    return parseInt(
      element.textContent.match(this.#findNumberRegex)
    )
  }

  #setAnimationConfig(config = {}) {
    this._animationConfig = {
      ...this.animationConfig,
      targets: this.#state,
      value: this.#endValue,
      update: () => {
        this.#targetElement.textContent =
          this.#targetElement.textContent.replace(
            this.#findNumberRegex,
            this.#state.value
          )
      },
      ...config,
    }
  }
}
