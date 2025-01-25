const orbits = document.querySelectorAll('[data-solar-system=orbit]')
const planets = document.querySelectorAll('[data-solar-system=planet]')
const users = document.querySelectorAll('.testimoni__user')

orbits.forEach((item, index) => {
  const baseWidth = 565
  const step = 122
  item.style.width = `${baseWidth + index * step}px`
  item.style.height = `${baseWidth + index * step}px`
})

const rotateAngle = 0.25

anime({
  targets: planets,
  rotate: (_, i) => `${i * rotateAngle + 1}turn`,
  easing: 'easeInOutQuad',
  duration: 3000,
});

anime({
  targets: users,
  rotate: (_, i) => `${-i * rotateAngle}turn`,
  easing: 'easeInOutQuad',
  duration: 3000,
})