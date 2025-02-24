const defaultConfig = {
  easing: 'easeInOutExpo',
  duration: 1000,
  delay: anime.stagger(300),
}

function validateArgs(args) {
  const [selector, morphPoints] = args
  let isValidate = true

  //Валидация selector
  if (
    typeof selector !== 'string' ||
    !document.querySelectorAll(selector)
  ) {
    isValidate = false
  }

  // валидация morphPoints
  if (
    typeof morphPoints !== 'object' ||
    morphPoints.length < 1
  ) {
    isValidate = false
  }

  return isValidate
}

/**
 * Запускает анимацию морфинга svg иконок
 * @param {string} selector - селектор атрибута path
 * @param {string[]} morphPoints - точки по которым идет морфинг
 */
export function startMorph(selector, morphPoints) {
  validateArgs([...arguments])

  anime({
    targets: selector,
    d: morphPoints,
    ...defaultConfig,
  })
}
