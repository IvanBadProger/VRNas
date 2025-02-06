function setDashArray(path) {
  const length = path.getTotalLength()
  path.style.strokeDasharray = length
  path.style.strokeDashoffset = length
  return length
}

const preloader = document.querySelector('.preloader')
const main = document.querySelector('main')
const paths = preloader.querySelectorAll('path')
paths.forEach((path) => setDashArray(path))

const animeConfigs = {
  strokePaint: {
    targets: paths,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 2000,
    easing: 'easeInOutCubic',
  },
  fillOpacity: {
    targets: paths,
    fillOpacity: [{ value: 1, duration: 500 }],
    strokeWidth: [
      { value: 0.5, duration: 100 },
      { value: 0, duration: 100 },
    ],
    easing: 'easeInOutQuad',
    delay: anime.stagger(50),
    endDelay: 200,
  },
  preloaderHide: {
    targets: paths,
    opacity: [1, 0],
    easing: 'spring',
    delay: anime.stagger(100),
    complete: function () {
      preloader.style.display = 'none'
    },
  },
  showMain: {
    targets: main,
    opacity: [0, 1],
    translateY: [10, 0],
    easing: 'linear',
    duration: 500,
  },
}

export function preloaderStart() {
  anime
    .timeline()
    .add(animeConfigs.strokePaint)
    .add(animeConfigs.fillOpacity)
    .add(animeConfigs.preloaderHide)
    .add(animeConfigs.showMain)
}
