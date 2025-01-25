const selectors = {
  orbits: document.querySelectorAll('[data-solar-system=orbit]'),
  planets: document.querySelectorAll('[data-solar-system=planet]'),
  users: document.querySelectorAll('.testimoni__user'),
}

const orbits = document.querySelectorAll(selectors.orbits)
const planets = document.querySelectorAll(selectors.planets)
const users = document.querySelectorAll(selectors.users)

const rotateAngle = 0.5

function createOrbits() {
  orbits.forEach((item, index) => {
    const baseWidth = 565
    const step = 122
    item.style.width = `${baseWidth + index * step}px`
    item.style.height = `${baseWidth + index * step}px`
  })
}

const animationPlanets = {
  targets: planets,
  rotate: (_, i) => `${i * rotateAngle + 1}turn`,
  easing: 'easeInOutQuad',
  duration: 3000,
}

const animationUsers = {
  targets: users,
  rotate: (_, i) => `${-i * rotateAngle}turn`,
  easing: 'easeInOutQuad',
  duration: 3000,
}

createOrbits()
anime(animationPlanets)
anime(animationUsers)