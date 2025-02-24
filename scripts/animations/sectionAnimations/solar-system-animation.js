/**
 * @constant {Object} CONFIG - Основные настройки анимации
 * @property {number} ROTATE_ANGLE - Угол поворота для анимации
 * @property {number} ANIMATION_DURATION - Длительность анимации в миллисекундах
 * @property {number} DEFAULT_ORBIT_SIZE - Базовый размер орбиты в пикселях
 * @property {number} VIEWPORT_BUFFER - Буферная зона для проверки видимости элементов
 * @property {number} MENU_WIDTH - Ширина меню для расчетов видимости
 * @property {number} POSITION_UPDATE_STEP - Шаг обновления позиции при корректировке
 */
const CONFIG = {
  ROTATE_ANGLE: 0.35,
  ANIMATION_DURATION: 3000,
  DEFAULT_ORBIT_SIZE: 500,
  VIEWPORT_BUFFER: 50,
  MENU_WIDTH: 200,
  POSITION_UPDATE_STEP: 0.02,
}

/**
 * @constant {Object} SELECTORS - DOM селекторы для элементов анимации
 * @property {string} orbit - Селектор орбит
 * @property {string} planet - Селектор планет
 * @property {string} userButton - Селектор кнопок пользователей
 * @property {string} userAvatar - Селектор аватаров пользователей
 * @property {string} container - Селектор контейнера анимации
 */
const SELECTORS = {
  orbit: '[data-solar-system=orbit]',
  planet: '[data-solar-system=planet]',
  userButton: '.testimoni__user',
  userAvatar: '.testimoni__avatar',
  container: '.testimonial__body',
}

/**
 * Класс управления анимацией солнечной системы
 * @class SolarSystemAnimation
 * @description Управляет анимацией и позиционированием элементов, имитирующих солнечную систему
 */
class SolarSystemAnimation {
  constructor() {
    this.elements = {
      orbits: document.querySelectorAll(SELECTORS.orbit),
      planets: document.querySelectorAll(SELECTORS.planet),
      userButtons: document.querySelectorAll(
        SELECTORS.userButton
      ),
      userAvatars: document.querySelectorAll(
        SELECTORS.userAvatar
      ),
      container: document.querySelector(SELECTORS.container),
    }

    this.animations = {
      planets: this.createPlanetAnimation(),
      users: this.createUserAnimation(),
    }
  }

  /**
   * Создает конфигурацию анимации для планет
   * @private
   * @returns {Object} Конфигурация анимации планет
   */
  createPlanetAnimation() {
    return {
      targets: this.elements.planets,
      rotate: (_, i) => `${i * CONFIG.ROTATE_ANGLE + 1}turn`,
      easing: 'easeInOutQuad',
      duration: CONFIG.ANIMATION_DURATION,
    }
  }

  /**
   * Создает конфигурацию анимации для пользователей
   * @private
   * @returns {Object} Конфигурация анимации пользователей
   */
  createUserAnimation() {
    return {
      targets: this.elements.userButtons,
      rotate: (_, i) => `${-i * CONFIG.ROTATE_ANGLE}turn`,
      easing: 'easeInOutQuad',
      duration: CONFIG.ANIMATION_DURATION,
      complete: () => {
        this.showAvatars()
        this.updateAllPositions()
      },
    }
  }

  /**
   * Вычисляет размер орбиты для заданного индекса
   * @private
   * @param {number} index - Индекс орбиты
   * @param {number} baseSize - Базовый размер орбиты
   * @param {number} step - Шаг увеличения размера
   * @returns {number} Вычисленный размер орбиты
   */
  calculateOrbitSize(index, baseSize, step) {
    const size = baseSize + index * step
    return Math.min(size, this.elements.container.clientHeight)
  }

  /**
   * Инициализирует размеры орбит
   * @private
   */
  initOrbitSizes() {
    const orbitStep =
      (this.elements.container.clientHeight -
        CONFIG.DEFAULT_ORBIT_SIZE) /
      (this.elements.orbits.length - 1)

    this.elements.orbits.forEach((orbit, index) => {
      const size = this.calculateOrbitSize(
        index,
        CONFIG.DEFAULT_ORBIT_SIZE,
        orbitStep
      )
      orbit.style.width = `${size}px`
      orbit.style.height = `${size}px`
    })
  }

  /**
   * Показывает аватары пользователей
   * @private
   */
  showAvatars() {
    this.elements.userAvatars.forEach((avatar) =>
      avatar.classList.add('testimoni__avatar--visible')
    )
  }

  /**
   * Проверяет, находится ли элемент за пределами viewport
   * @private
   * @param {HTMLElement} element - Проверяемый элемент
   * @returns {boolean} True если элемент за пределами viewport
   */
  isOutOfViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.right < CONFIG.VIEWPORT_BUFFER ||
      rect.left >
        window.innerWidth -
          CONFIG.VIEWPORT_BUFFER -
          CONFIG.MENU_WIDTH
    )
  }

  /**
   * Получает текущее значение поворота элемента
   * @private
   * @param {HTMLElement} element - Элемент для проверки
   * @returns {number} Значение поворота в единицах turn
   */
  getRotation(element) {
    const transform = element.style.transform
    const match = transform.match(/-?\d*\.?\d+/)
    return match ? parseFloat(match[0]) : 0
  }

  /**
   * Обновляет позицию планеты и пользователя по индексу
   * @private
   * @param {number} index - Индекс обновляемых элементов
   */
  updatePosition(index) {
    const planet = this.elements.planets[index]
    const user = this.elements.userButtons[index]

    let planetRotation = this.getRotation(planet)
    let userRotation = this.getRotation(user)

    while (this.isOutOfViewport(user)) {
      planetRotation += CONFIG.POSITION_UPDATE_STEP
      userRotation -= CONFIG.POSITION_UPDATE_STEP

      planet.style.transform = `rotate(${planetRotation}turn)`
      user.style.transform = `rotate(${userRotation}turn)`
    }
  }

  /**
   * Обновляет позиции всех планет и пользователей
   * @private
   */
  updateAllPositions() {
    this.elements.planets.forEach((_, index) =>
      this.updatePosition(index)
    )
  }

  /**
   * Запускает анимацию солнечной системы
   * @public
   */
  start() {
    this.initOrbitSizes()
    anime(this.animations.planets)
    anime(this.animations.users)
  }
}

/**
 * Инициализирует и запускает анимацию солнечной системы
 * @function initSolarSystem
 * @exports
 */
export const startSolarSystem = () => {
  const solarSystem = new SolarSystemAnimation()
  solarSystem.start()
}
