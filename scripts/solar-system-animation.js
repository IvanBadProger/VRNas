/**
 * @module - модуль описывающий работу анимации секции отзывов на основе ассоциации их с планетами солнечной системы
 *
 * @note - подумываю переписать этот модуль, выглядит как бред сумашедшего
 */
const selectors = {
  orbits: '[data-solar-system=orbit]',
  planets: '[data-solar-system=planet]',
  users: '.testimoni__user',
  avatars: '.testimoni__avatar',
}

const classes = {
  avatarVisible: 'testimoni__avatar--visible',
}

const orbits = document.querySelectorAll(selectors.orbits)
const planets = document.querySelectorAll(selectors.planets)
const users = document.querySelectorAll(selectors.users)
const avatars = document.querySelectorAll(selectors.avatars)

const ROTATE_ANGLE = 0.35

const animationPlanets = {
  targets: planets,
  rotate: (_, i) => `${i * ROTATE_ANGLE + 1}turn`,
  easing: 'easeInOutQuad',
  duration: 3000,
}

const animationUsers = {
  targets: users,
  rotate: (_, i) => `${-i * ROTATE_ANGLE}turn`,
  easing: 'easeInOutQuad',
  duration: 3000,
  complete: () => {
    showAvatars()
    checkPlanetsPosition()
  },
}

/**
 * Динамическая генерация размеров орбит.
 *
 * Функция задает инлайновые стили width и height уникальные для каждого элемента массива orbits
 * (была еще мысль орбиты полностью генерировать через js, но мы же дефолтную верстку делаем, а не через шаблонизаторы)
 */
function setOrbitSize() {
  orbits.forEach((item, index) => {
    const orbitSizeBase = 550
    const orbitSizeStep = 130
    const sizeCurrentOrbit =
      orbitSizeBase + index * orbitSizeStep

    item.style.width = `${sizeCurrentOrbit}px`
    item.style.height = `${sizeCurrentOrbit}px`
  })
}

/**
 * Функция добавляет всем элементам масссива avatars класс visible.
 */
function showAvatars() {
  avatars.forEach((item) =>
    item.classList.add(classes.avatarVisible)
  )
}

/**
 * Функция проверяет вышел ли элемент за пределы экрана по горизонтали.
 *
 * @param {HTMLElement} element - элемент, который необходимо проверить
 * @param {number} buffer - погрешность, дистанция в пикселях от края экрана, включенная в проверку.
 * @param {number} menuWidth - размер открывающегося меню при наведении
 *
 * @returns {boolean} результат проверки.
 */
function isElementOutOfViewportHorizontally(
  element,
  buffer = 50,
  menuWidth = 200
) {
  const rect = element.getBoundingClientRect()

  return (
    rect.right < buffer ||
    rect.left > window.innerWidth - buffer - menuWidth
  )
}

/**
 * Функция получает текущее значение поворота (rotate) у элемента.
 *
 * @param {HTMLElement} element - элемент, значение поворота которого, необходимо вычислить
 *
 * @returns {number} значение поворота (подразумевается значение в turn единицах, потом сделаю адаптивнее)
 */
function getRotateElement(element) {
  const rotate = element.style.transform.match(/-?\d*\.?\d+/)

  return rotate ? parseFloat(rotate[0]) : 0
}

/**
 * Функция "докрутки" элементов.
 * Получает текущее значение rotate для текущей планеты и изображения пользователя
 * и увеличивает значение rotate до тех пор, пока планета не войдет в пределы экрана
 *
 * @param {number} index - порядковый индекс планеты и изображения пользователя
 * @param {number} [step] - шаг, на который увеличивается rotate (подразумеваются turn единицы)
 */
function updatePlanetAndUserPosition(index, step = 0.02) {
  let rotatePlanet = getRotateElement(planets[index])
  let rotateUser = getRotateElement(users[index])

  while (isElementOutOfViewportHorizontally(users[index])) {
    rotatePlanet += step
    rotateUser -= step

    // prettier-ignore
    planets[index].style.transform = `rotate(${rotatePlanet}turn)`;
    users[index].style.transform = `rotate(${rotateUser}turn)`
  }
}

/**
 * Функция пробегающая по массиву планет
 * @note бля над рентабельностью данной функции подумать
 */
function checkPlanetsPosition() {
  planets.forEach((_, index) =>
    updatePlanetAndUserPosition(index)
  )
}

/**
 * Функция инициализатор анимации: устанавливает размер орбит, запускает планеты по орбитам и вокруг своей оси
 */
export function initSolarSystem() {
  setOrbitSize()
  anime(animationPlanets)
  anime(animationUsers)
}
