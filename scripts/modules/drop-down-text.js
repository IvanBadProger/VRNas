const accordions = document.querySelectorAll('.accordion__title')

const classes = {
  accordionFocus: 'focus-accordion',
  focusText: 'focus-text',
}

function showText(accordionId) {
  const textId = document.querySelector(
    `[data-text="${accordionId}"]`
  )
  textId.classList.toggle(classes.focusText)
}

export function initializeAccordion() {
  accordions.forEach((accordion) => {
    accordion.addEventListener('click', function () {
      const accordionId = this.dataset.accordionId

      accordion.classList.toggle(classes.accordionFocus)
      showText(accordionId)
    })
  })
}
