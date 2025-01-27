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
const ROTATE_STEP = 0.02

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

function showAvatars() {
  avatars.forEach((item) =>
    item.classList.add(classes.avatarVisible)
  )
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

function getRotateElement(element) {
  const rotate = element.style.transform.match(/-?\d*\.?\d+/)

  return rotate ? parseFloat(rotate[0]) : 0
}

function updatePlanetAndUserPosition(index) {
  let rotatePlanet = getRotateElement(planets[index])
  let rotateUser = getRotateElement(users[index])

  while (isElementOutOfViewportHorizontally(users[index])) {
    rotatePlanet += ROTATE_STEP
    rotateUser -= ROTATE_STEP

    // prettier-ignore
    planets[index].style.transform = `rotate(${rotatePlanet}turn)`;
    users[index].style.transform = `rotate(${rotateUser}turn)`
  }
}

function checkPlanetsPosition() {
  planets.forEach((_, index) =>
    updatePlanetAndUserPosition(index)
  )
}

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

function initSolarSystem() {
  setOrbitSize()
  anime(animationPlanets)
  anime(animationUsers)
}

initSolarSystem()
