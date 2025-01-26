const selectors = {
  orbits: '[data-solar-system=orbit]',
  planets: '[data-solar-system=planet]',
  users: '.testimoni__user',
  avatars: '.testimoni__avatar',
}

const orbits = document.querySelectorAll(selectors.orbits)
const planets = document.querySelectorAll(selectors.planets)
const users = document.querySelectorAll(selectors.users)
const avatars = document.querySelectorAll(selectors.avatars)

const rotateAngle = 0.35

function setOrbitSize() {
  orbits.forEach((item, index) => {
    const baseWidth = 550
    const step = 150
    item.style.width = `${baseWidth + index * step}px`
    item.style.height = `${baseWidth + index * step}px`
  })
}

function showAvatars() {
  avatars.forEach((item) => {
    item.classList.add('testimoni__avatar--active')
  })
}

function isElementOutOfViewportHorizontally(element) {
  const buffer = 50
  const menuWidth = 200
  const rect = element.getBoundingClientRect()

  return (
    rect.right < buffer ||
    rect.left > window.innerWidth - buffer - menuWidth
  )
}

function checkPlanetsPosition() {
  const step = 0.02

  for (let index = 0; index < planets.length; index++) {
    let rotatePlanet = parseFloat(
      planets[index].style.transform.match(/-?\d*\.?\d+/)[0]
    )

    let rotateUser = parseFloat(
      users[index].style.transform.match(/-?\d*\.?\d+/)[0]
    )

    while (isElementOutOfViewportHorizontally(users[index])) {
      rotatePlanet += step
      rotateUser -= step

      planets[
        index
      ].style.transform = `rotate(${rotatePlanet}turn)`
      users[index].style.transform = `rotate(${rotateUser}turn)`
    }
  }
}

const animationPlanets = {
  targets: planets,
  rotate: (_, i) => `${i * rotateAngle + 1}turn`,
  easing: 'easeInOutQuad',
  duration: 3000,
  complete: () => {},
}

const animationUsers = {
  targets: users,
  rotate: (_, i) => `${-i * rotateAngle}turn`,
  easing: 'easeInOutQuad',
  duration: 3000,
  complete: () => {
    showAvatars()
    checkPlanetsPosition()
  },
}

setOrbitSize()
anime(animationPlanets)
anime(animationUsers)
