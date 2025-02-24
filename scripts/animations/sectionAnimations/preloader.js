const CONFIG = {
  stroke: {
    duration: 2000,
    easing: 'easeInOutCubic',
  },
  fill: {
    opacity: {
      duration: 500,
    },
    stroke: {
      thin: { value: 0.5, duration: 100 },
      hide: { value: 0, duration: 100 },
    },
    easing: 'easeInOutQuad',
    staggerDelay: 50,
    endDelay: 200,
  },
  fade: {
    easing: 'spring',
    staggerDelay: 100,
  },
  main: {
    duration: 500,
    easing: 'linear',
    translateY: {
      from: 10,
      to: 0,
    },
  },
}

/**
 * Класс управления анимацией прелоадера
 * @class PreloaderAnimation
 */
class PreloaderAnimation {
  constructor() {
    this.elements = {
      main: document.querySelector('main'),
      preloader: document.querySelector('.preloader'),
      paths: document.querySelectorAll('.preloader path'),
    }

    this.initializePaths()
    this.createAnimationConfigs()
  }

  /**
   * Инициализирует SVG пути установкой stroke-dash параметров
   * @private
   */
  initializePaths() {
    this.elements.paths.forEach((path) => {
      const length = path.getTotalLength()
      path.style.strokeDasharray = length
      path.style.strokeDashoffset = length
    })
  }

  /**
   * Создает конфигурации для всех анимаций
   * @private
   */
  createAnimationConfigs() {
    /**
     * @private
     * @property {Object} animations - Конфигурации анимаций
     */
    this.animations = {
      stroke: this.createStrokeAnimation(),
      fill: this.createFillAnimation(),
      hide: this.createHideAnimation(),
      showMain: this.createMainAnimation(),
    }
  }

  /**
   * Создает конфигурацию анимации отрисовки линий
   * @private
   * @returns {Object} Конфигурация анимации
   */
  createStrokeAnimation() {
    return {
      targets: this.elements.paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: CONFIG.stroke.duration,
      easing: CONFIG.stroke.easing,
    }
  }

  /**
   * Создает конфигурацию анимации заполнения
   * @private
   * @returns {Object} Конфигурация анимации
   */
  createFillAnimation() {
    return {
      targets: this.elements.paths,
      fillOpacity: [
        {
          value: 1,
          duration: CONFIG.fill.opacity.duration,
        },
      ],
      strokeWidth: [
        CONFIG.fill.stroke.thin,
        CONFIG.fill.stroke.hide,
      ],
      easing: CONFIG.fill.easing,
      delay: anime.stagger(CONFIG.fill.staggerDelay),
      endDelay: CONFIG.fill.endDelay,
    }
  }

  /**
   * Создает конфигурацию анимации скрытия прелоадера
   * @private
   * @returns {Object} Конфигурация анимации
   */
  createHideAnimation() {
    return {
      targets: this.elements.paths,
      opacity: [1, 0],
      easing: CONFIG.fade.easing,
      delay: anime.stagger(CONFIG.fade.staggerDelay),
      complete: () => {
        this.elements.preloader.style.display = 'none'
      },
    }
  }

  /**
   * Создает конфигурацию анимации показа основного контента
   * @private
   * @returns {Object} Конфигурация анимации
   */
  createMainAnimation() {
    return {
      targets: this.elements.main,
      opacity: [0, 1],
      translateY: [
        CONFIG.main.translateY.from,
        CONFIG.main.translateY.to,
      ],
      easing: CONFIG.main.easing,
      duration: CONFIG.main.duration,
      begin: () => {
        this.elements.main.style.display = 'block'
      },
    }
  }

  /**
   * Создает временную линию анимации
   * @private
   * @returns {Object} Временная линия anime.js
   */
  createTimeline() {
    return anime.timeline({
      begin: () => {
        document.body.classList.add('isLock')
        this.elements.main.style.display = 'none'
      },
      complete: () => {
        document.body.classList.remove('isLock')
      },
    })
  }
  /**
   * Запускает анимацию прелоадера
   * @public
   */
  start() {
    this.createTimeline()
      .add(this.animations.stroke)
      .add(this.animations.fill)
      .add(this.animations.hide)
      .add(this.animations.showMain)
  }
}

/**
 * Инициализирует и запускает анимацию прелоадера
 * @function startPreloader
 * @exports
 */
export function startPreloader() {
  const preloader = new PreloaderAnimation()
  preloader.start()
}
