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

const d1 =
  'M4.35556 6.31111L3.11111 7.55556L7.11111 11.5556L16 2.66667L14.7556 1.42222L7.11111 9.06667L4.35556 6.31111ZM14.2222 14.2222H1.77778V1.77778H10.6667V0H1.77778C0.8 0 0 0.8 0 1.77778V14.2222C0 15.2 0.8 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V7.11111H14.2222V14.2222Z'
const d0 =
  'M14.2222 14.2222H1.77778V1.77778H10.6667V0H1.77778C0.8 0 0 0.8 0 1.77778V14.2222C0 15.2 0.8 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V7.11111H14.2222V14.2222Z'

anime({
  targets: '.check-icon path',
  d: [d0, d1],
  easing: 'easeInOutExpo',
  duration: 1000,
  delay: anime.stagger(300),
})
