const selectors = {
  slides: '.slide',
  paginationItems: '.slider__pagination-item',
  paginaton: '.slider__pagination',
}

const classes = {
  slideActive: 'slide--active',
  paginationItemActive: 'slider__pagination-item--active',
}

const elements = {
  slides: document.querySelectorAll(selectors.slides),
  pagination: document.querySelector(selectors.paginaton),
  paginationItems: [],
}

const state = {
  activeIndex: 0,
  slidesCount: elements.slides.length,
}

/**
 * Устанавливает активный класс слайду по index
 *
 * @param {number} index - индекс слайда, который нужно сделать активным
 */
function setActiveSlide(index) {
  elements.slides.forEach((slide) => {
    slide.classList.remove(classes.slideActive)
  })

  elements.slides[index].classList.add(classes.slideActive)
}

/**
 * Устанавливает активный класс элементу пагинации по index
 *
 * @param {number} index - индекс элемента пагинации, который нужно сделать активным
 */
function setActivePaginationItem(index) {
  elements.paginationItems.forEach((item) => {
    item.classList.remove(classes.paginationItemActive)
  })

  elements.paginationItems[index].classList.add(
    classes.paginationItemActive
  )
}

function updateSlider() {
  setActivePaginationItem(state.activeIndex)
  setActiveSlide(state.activeIndex)
}

function createPaginationBullet(index) {
  const bullet = document.createElement('button')
  const text = `Перейти к слайду ${index}`

  bullet.classList.add('slider__pagination-item')
  bullet.setAttribute('type', 'button')
  bullet.setAttribute('aria-label', text)
  bullet.setAttribute('title', text)
  bullet.addEventListener('click', () =>
    paginationItemClick(index)
  )
  elements.paginationItems.push(bullet)
  elements.pagination.appendChild(bullet)
}

/**
 * Обработчик клика по элементу пагинации. Сделает элемент по которому кликнули активным
 *
 */
function paginationItemClick(index) {
  state.activeIndex = index
  updateSlider()
}

function initializePagination() {
  elements.slides.forEach((_, index) => {
    createPaginationBullet(index)
  })
}

/**
 * Функция для пролистывания слайдера вправо и влево
 *
 * @param {1 | -1} direction - направление движения слайдов
 */
function changeSlide(direction) {
  state.activeIndex =
    (state.activeIndex + direction + elements.slides.length) %
    elements.slides.length

  updateSlider()
}

/**
 * Обработчик событий нажатия на клавиши
 */
function keyEventsBind() {
  document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
      changeSlide(-1)
    }
    if (event.code === 'ArrowRight') {
      changeSlide(1)
    }
  })
}

/**
 * Инициализатор слайдера. Запускает его работу
 */
export function initSlider() {
  initializePagination()
  updateSlider()
  // autoplayStart()
  keyEventsBind()
}
