const accordions = document.querySelectorAll('.accordion__title')

export function showText(accordionId) {
  const textId = document.querySelector(
    `[data-text="${accordionId}"]`
  )
    textId.classList.toggle('focus-text')
}

accordions.forEach((accordion) => {
  accordion.addEventListener('click', function () {
    accordion.classList.toggle('focus-accordion') === 'focus-accordion'
    const accordionId = this.dataset.accordionId
    showText(accordionId)
  })
})
