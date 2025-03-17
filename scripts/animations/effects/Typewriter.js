import { BaseEffect } from '../core/BaseEffect.js'

export class TypewriterEffect extends BaseEffect {
  #element
  #text
  #cursor
  #settings = TypewriterEffect.defaultSettings
  _animationConfig = TypewriterEffect.defaultConfig

  static defaultConfig = {
    duration: 2000,
    delay: 0,
    easing: 'linear',
  }

  static defaultSettings = {
    showCursor: false,
    cursorSymbol: '|',
    keepSize: true,
  }

  constructor({ selector, config = {}, settings = {} }) {
    super()
    this.#element = document.querySelector(selector)
    this.#text = this.#element.textContent
    this.#settings = { ...this.#settings, ...settings }
    this._animationConfig = {
      ...TypewriterEffect.defaultConfig,
      targets: this.#element,
      update: (anime) => this.#updateContent(anime.progress),
      complete: () => this.#completeAnimation(),
      ...config,
    }

    this.#cursor = this.#settings.showCursor
      ? this.#settings.cursorSymbol
      : null

    this.#initialize()
  }

  #initialize() {
    this.#preserveSize()
    this.#clearContent()
  }

  #preserveSize() {
    if (!this.#settings.keepSize) return

    Object.assign(this.#element.style, {
      height: `${this.#element.offsetHeight}px`,
      width: `${this.#element.offsetWidth}px`,
    })
  }

  #clearContent() {
    this.#element.textContent = ''
  }

  #resetSize() {
    if (!this.#settings.keepSize) return

    Object.assign(this.#element.style, {
      height: '',
      width: '',
    })
  }

  #updateContent(progress) {
    const textLength = Math.floor(
      (progress / 100) * this.#text.length
    )
    this.#element.textContent = this.#text.substring(
      0,
      textLength
    )

    if (this.#cursor) {
      this.#element.textContent += this.#cursor
    }
  }

  #completeAnimation() {
    if (this.#settings.keepSize) {
      this.#resetSize()
    }

    if (this.#cursor) {
      this.#element.textContent = this.#text
      this.#cursor = null
    }
  }
}
