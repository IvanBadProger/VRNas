const tabs = document.querySelectorAll('.choose-us__tab-title')

function showText(targetId) {
  const textId = document.querySelector(
    `[data-text="${targetId}"]`
  )
  if (textId) {
    textId.classList.toggle('focus-text')
  }
}

tabs.forEach((tab) => {
  tab.addEventListener('click', function () {
    if (tab.classList.contains('focus-tab')) {
      tab.classList.remove('focus-tab')
    } else {
      tab.classList.add('focus-tab')
    }
    const targetId = this.dataset.targetId
    showText(targetId)
  })
})
