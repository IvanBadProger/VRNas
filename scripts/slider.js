const selectors = {
  slides: '.slide',
  paginationItems: '.slider__pagination-item',
}

const classes = {
  slideActive: 'slide--active',
  paginationItemActive: 'slider__pagination-item--active',
}

const slides = document.querySelectorAll(selectors.slides)
const paginationItems = document.querySelectorAll(
  selectors.paginationItems
)
let activeIndex = 0

/**
 * Устанавливает активный класс слайду по index
 *
 * @param {number} index - индекс слайда, который нужно сделать активным
 */
function setActiveSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove(classes.slideActive)
  })

  slides[index].classList.add(classes.slideActive)
}

/**
 * Устанавливает активный класс элементу пагинации по index
 *
 * @param {number} index - индекс элемента пагинации, который нужно сделать активным
 */
function setActivePaginationItem(index) {
  paginationItems.forEach((item) => {
    item.classList.remove(classes.paginationItemActive)
  })

  paginationItems[index].classList.add(
    classes.paginationItemActive
  )
}
/**
 * Запускает автопролистывание слайдов
 */
function autoPlay() {}

/**
 * Обработчик клика по элементу пагинации. Сделает элемент по которому кликнули активным
 *
 * @param {MouseEvent<HTMLButtonElement>} event - событие клика мыши
 */
function paginationItemClick(event) {
  const clickedIndex = [...paginationItems].indexOf(event.target)

  if (clickedIndex === -1) {
    console.log('clickedIndex = -1')
  }

  setActiveSlide(clickedIndex)
  setActivePaginationItem(clickedIndex)
}

/**
 * Функция для пролистывания слайдера вправо и влево
 *
 * @param {1 | -1} direction - направление движения слайдов
 */
function changeSlide(direction) {
  activeIndex =
    (activeIndex + direction + slides.length) % slides.length

  setActivePaginationItem(activeIndex)
  setActiveSlide(activeIndex)
}

/**
 * Обработчик событий нажатия на клавиши
 */
function keyBind() {
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
  paginationItems.forEach((item) => {
    item.addEventListener('click', paginationItemClick)
  })

  setActivePaginationItem(activeIndex)
  setActiveSlide(activeIndex)
  // autoPlay()
  keyBind()
}
