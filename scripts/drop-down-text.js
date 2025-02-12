const tabs = document.querySelectorAll('.tab__title')

function showText(tabId) {
  const textId = document.querySelector(
    `[data-text="${tabId}"]`
  )
    textId.classList.toggle('focus-text')
}

tabs.forEach((tab) => {
  tab.addEventListener('click', function () {
    tab.classList.toggle('focus-tab') === 'focus-tab'
    const tabId = this.dataset.tabId
    showText(tabId)
  })
})
