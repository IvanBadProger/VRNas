/**
 * Создает эффект печатающейся машинки для текстового содержимого
 * @param {string} selector - CSS селектор целевого элемента
 * @param {Object} [config] - Настройки анимации
 * @param {number} [config.duration=2000] - Продолжительность анимации (мс)
 * @param {number} [config.delay=0] - Задержка перед началом (мс)
 * @param {string} [config.easing='linear'] - Функция плавности
 * @param {boolean} [config.showCursor=true] - Показывать курсор
 * @param {string} [config.cursorSymbol='|'] - Символ курсора
 * @param {boolean} [config.keepSize=true] - Сохранять размеры элемента
 * @returns {Object} Конфигурация анимации для anime.js
 */
export const startTypewriter = (selector, config = {}) => {
  const targetElement = document.querySelector(selector)

  if (!targetElement)
    throw new Error(`Элемент ${selector} не найден`)

  const text = targetElement.textContent

  const settings = {
    duration: 2000,
    delay: 0,
    easing: 'linear',
    showCursor: false,
    cursorSymbol: '|',
    keepSize: true,
    ...config,
  }

  let cursor = settings.showCursor ? settings.cursorSymbol : null

  function setElementSize() {
    if (settings.keepSize) {
      Object.assign(targetElement.style, {
        height: `${targetElement.offsetHeight}px`,
        width: `${targetElement.offsetWidth}px`,
      })
    }
  }

  function clearTextContent() {
    targetElement.textContent = ''
  }

  setElementSize()
  clearTextContent()

  return {
    targets: targetElement,
    duration: settings.duration,
    delay: settings.delay,
    easing: settings.easing,
    update: (anime) => {
      const progress = Math.floor(
        (anime.progress / 100) * text.length
      )
      targetElement.textContent = text.substring(0, progress)

      if (cursor) targetElement.textContent += cursor
    },
    complete: () => {
      if (settings.keepSize) {
        Object.assign(targetElement.style, {
          height: '',
          width: '',
        })
      }
      if (cursor) {
        targetElement.textContent = text
        cursor = null
      }
    },
  }
}
