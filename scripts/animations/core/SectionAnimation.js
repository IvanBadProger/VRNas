import { MESSAGES } from '../config/constants.js'
import { AnimationError } from './AnimationError.js'
import { BaseEffect } from './BaseEffect.js'

export class SectionAnimation {
  _baseElement
  _state = { isRunning: false }
  // fix: мысли по поводу sectionName
  _animationName
  _effects = []

  /**
   * @param {string} animationName - имя анимации, должно совпадать со значением атрибута data-animation-name
   */
  constructor(animationName) {
    this._animationName = animationName

    this.setBaseElement()
  }

  // fix: гибкая настройка tl -=300
  start() {
    if (this._state.isRunning) {
      new AnimationError(MESSAGES.ANIMATION_IS_RUNNING)
    }

    this._state.isRunning = true

    const tl = anime.timeline()
    this._effects.forEach((effect) => {
      tl.add(effect.animationConfig, '-=300')
    })
  }

  get baseElement() {
    return this._baseElement
  }

  get animationName() {
    return this._animationName
  }

  setBaseElement() {
    try {
      const selector = `[data-animation-name=${this._animationName}]`

      this._baseElement = document.querySelector(selector)
    } catch (error) {
      throw new AnimationError(error.message)
    }
  }

  addEffect(effect) {
    if (!effect instanceof BaseEffect) {
      throw new AnimationError(MESSAGES.EFFECT_INSTANCEOF)
    }

    this._effects.push(effect)
  }
}
