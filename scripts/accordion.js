export function initAccordions() {
  const accordions = document.querySelectorAll(
    '.accordion__title'
  )

  accordions.forEach((accordion) => {
    accordion.addEventListener('click', function () {
      this.classList.toggle('focus-accordion')

      const accordionId = this.dataset.accordionId

      const textId = document.querySelector(
        `[data-text=${accordionId}]`
      )

      textId.classList.toggle('focus-text')
    })
  })
}
