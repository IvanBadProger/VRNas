const config = {
  padding: 0.05,
  centeringOffset: {
    x: 0,
    y: 0,
  },
  duration: 800,
  staggerDelay: 150,
  easing: 'easeOutElastic(1, .5)',
  circles: {
    duration: 600,
    staggerDelay: 100,
    easing: 'easeOutSine',
  },
}

const elements = {
  logos: document.querySelectorAll('.partners__item'),
  circles: document.querySelectorAll('.partners__circles path'),
  path: document.querySelector('#partners-path'),
  svg: document.querySelector('.partners__circles'),
  list: document.querySelector('.partners__list'),
}

const getPathPositions = (pathLength, totalItems, padding) => {
  const usablePathLength = pathLength * (1 - 2 * padding)
  const startOffset = pathLength * padding

  return Array.from(
    { length: totalItems },
    (_, index) =>
      startOffset + (usablePathLength * index) / (totalItems - 1)
  )
}

const calculateScaling = (container, svg) => {
  const rect = container.getBoundingClientRect()

  return {
    x: rect.width / svg.viewBox.baseVal.width,
    y: rect.height / svg.viewBox.baseVal.height,
    rect,
  }
}

const updateLogoPosition = (
  logo,
  point,
  scale,
  centeringOffset
) => {
  const logoRect = logo.getBoundingClientRect()
  const x =
    point.x * scale.x -
    logoRect.width / 2 +
    scale.rect.width * centeringOffset.x
  const y =
    point.y * scale.y -
    logoRect.height / 2 +
    scale.rect.height * centeringOffset.y

  logo.style.transform = `translate(${x}px, ${y}px)`
}

const updatePositions = () => {
  const scale = calculateScaling(elements.list, elements.svg)
  const positions = getPathPositions(
    elements.path.getTotalLength(),
    elements.logos.length,
    config.padding
  )

  positions.forEach((position, index) => {
    const point = elements.path.getPointAtLength(position)

    updateLogoPosition(
      elements.logos[index],
      point,
      scale,
      config.centeringOffset
    )
  })
}

const circlesAnimation = {
  targets: elements.circles,
  opacity: [0, 1],
  easing: config.circles.easing,
  duration: config.circles.duration,
  delay: anime.stagger(config.circles.staggerDelay),
}

const logosAnimation = {
  targets: elements.logos,
  opacity: [0, 1],
  scale: [0, 1],
  easing: config.easing,
  duration: config.duration,
  delay: anime.stagger(config.staggerDelay),
}

export function startPartners() {
  updatePositions()

  anime
    .timeline()
    .add(circlesAnimation)
    .add(logosAnimation, '-=200')
}
