/** @constant {Object} CONFIG - Конфигурация анимации партнеров
 * @property {number} padding - Отступ от краев пути для размещения логотипов
 * @property {Object} centeringOffset - Смещение для центрирования элементов
 * @property {number} duration - Длительность основной анимации
 * @property {number} staggerDelay - Задержка между анимациями элементов
 * @property {string} easing - Функция плавности анимации
 * @property {Object} circles - Настройки анимации кругов
 */
const CONFIG = {
  padding: 0.05,
  centeringOffset: { x: 0, y: 0 },
  duration: 800,
  staggerDelay: 150,
  easing: 'easeOutElastic(1, .5)',
  circles: {
    duration: 600,
    staggerDelay: 100,
    easing: 'easeOutSine',
  },
}

/**
 * Класс управления анимацией и размещением логотипов партнеров
 * @class PartnersAnimation
 */
class PartnersAnimation {
  constructor() {
    this.elements = {
      logos: document.querySelectorAll('.partners__item'),
      circles: document.querySelectorAll(
        '.partners__circles path'
      ),
      path: document.querySelector('#partners-path'),
      svg: document.querySelector('.partners__circles'),
      list: document.querySelector('.partners__list'),
    }

    /**
     * @private
     * @property {Object} animations - Конфигурации анимаций
     */
    this.animations = {
      circles: this.createCirclesAnimation(),
      logos: this.createLogosAnimation(),
    }
  }

  /**
   * Создает конфигурацию анимации кругов
   * @private
   * @returns {Object} Конфигурация анимации
   */
  createCirclesAnimation() {
    return {
      targets: this.elements.circles,
      opacity: [0, 1],
      easing: CONFIG.circles.easing,
      duration: CONFIG.circles.duration,
      delay: anime.stagger(CONFIG.circles.staggerDelay),
    }
  }

  /**
   * Создает конфигурацию анимации логотипов
   * @private
   * @returns {Object} Конфигурация анимации
   */
  createLogosAnimation() {
    return {
      targets: this.elements.logos,
      opacity: [0, 1],
      scale: [0, 1],
      easing: CONFIG.easing,
      duration: CONFIG.duration,
      delay: anime.stagger(CONFIG.staggerDelay),
    }
  }

  /**
   * Вычисляет позиции на пути для размещения логотипов
   * @private
   * @param {number} pathLength - Длина пути
   * @param {number} totalItems - Количество элементов
   * @param {number} padding - Отступ
   * @returns {Array<number>} Массив позиций
   */
  getPathPositions(pathLength, totalItems, padding) {
    const usablePathLength = pathLength * (1 - 2 * padding)
    const startOffset = pathLength * padding

    return Array.from(
      { length: totalItems },
      (_, index) =>
        startOffset +
        (usablePathLength * index) / (totalItems - 1)
    )
  }

  /**
   * Вычисляет масштаб для правильного позиционирования
   * @private
   * @param {HTMLElement} container - Контейнер
   * @param {SVGElement} svg - SVG элемент
   * @returns {Object} Объект с параметрами масштабирования
   */
  calculateScaling(container, svg) {
    const rect = container.getBoundingClientRect()

    return {
      x: rect.width / svg.viewBox.baseVal.width,
      y: rect.height / svg.viewBox.baseVal.height,
      rect,
    }
  }

  /**
   * Обновляет позицию отдельного логотипа
   * @private
   * @param {HTMLElement} logo - Элемент логотипа
   * @param {Object} point - Точка на пути
   * @param {Object} scale - Параметры масштабирования
   * @param {Object} centeringOffset - Смещение для центрирования
   */
  updateLogoPosition(logo, point, scale, centeringOffset) {
    const logoRect = logo.getBoundingClientRect()
    const x =
      point.x * scale.x -
      logoRect.width / 2 +
      scale.rect.width * centeringOffset.x
    const y =
      point.y * scale.y -
      logoRect.height / 2 +
      scale.rect.height * centeringOffset.y

    logo.style.transform = `translate(${x}px, ${y}px)`
  }

  updatePositions() {
    const scale = this.calculateScaling(
      this.elements.list,
      this.elements.svg
    )
    const positions = this.getPathPositions(
      this.elements.path.getTotalLength(),
      this.elements.logos.length,
      CONFIG.padding
    )

    positions.forEach((position, index) => {
      const point = this.elements.path.getPointAtLength(position)
      this.updateLogoPosition(
        this.elements.logos[index],
        point,
        scale,
        CONFIG.centeringOffset
      )
    })
  }

  start() {
    this.updatePositions()

    anime
      .timeline()
      .add(this.animations.circles)
      .add(this.animations.logos, '-=200')
  }
}

export function startPartners() {
  const partnersAnimation = new PartnersAnimation()
  partnersAnimation.start()
}
