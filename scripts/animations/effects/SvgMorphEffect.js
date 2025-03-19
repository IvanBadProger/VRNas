import { BaseEffect } from '../core/BaseEffect.js'
import { AnimationError } from '../core/AnimationError.js'

export class SvgMorphEffect extends BaseEffect {
  #selector
  #morphPoints
  _animationConfig = SvgMorphEffect.defaultConfig

  static defaultConfig = {
    targets: undefined,
    d: undefined,
    easing: 'easeInOutExpo',
    duration: 1000,
    delay: anime.stagger(300),
  }

  /**
   * Создает анимацию морфинга SVG path
   * @param {string} selector - селектор path элемента
   * @param {string[]} morphPoints - массив точек для морфинга
   * @param {Object} config - настройки эффекта, отличные от дефолтных
   */
  constructor(selector, morphPoints, config = {}) {
    super()
    this.validateInputs(selector, morphPoints)

    this.#selector = selector
    this.#morphPoints = morphPoints

    this.setConfig(config)
  }

  validateInputs(selector, morphPoints) {
    function isValidSelector(selector) {
      return (
        typeof selector === 'string' &&
        document.querySelectorAll(selector).length > 0
      )
    }

    function isValidMorphPoints(points) {
      return typeof points === 'object' && points.length > 0
    }

    if (!isValidSelector(selector)) {
      throw new AnimationError(
        `Элемент с селектором ${selector} не найден`
      )
    }

    if (!isValidMorphPoints(morphPoints)) {
      throw new AnimationError('Инвалид morph points')
    }
  }

  setConfig(config = {}) {
    this._animationConfig = {
      ...this.animationConfig,
      targets: this.#selector,
      d: this.#morphPoints,
      ...config,
    }
  }
}
