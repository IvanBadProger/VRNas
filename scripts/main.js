import { initSlider } from './modules/slider.js'
import { startObserver } from './animations/observer.js'
import { initializeAccordion } from './modules/drop-down-text.js'
import { startPreloader } from './animations/sectionAnimations/preloader.js'

startObserver()
initializeAccordion()
initSlider()
startPreloader()
