import { AnimationsObserver } from './core/AnimationsObserver.js'
import { aboutUsAnimation } from './sections/about-us.js'
import { heroAnimation } from './sections/hero.js'
import { partnersAnimations } from './sections/partners.js'
import { testimonialAnimations } from './sections/solar-system-animation.js'

export function startObserver() {
  const observer = new AnimationsObserver()

  observer.register(heroAnimation)
  observer.register(aboutUsAnimation)
  observer.register(testimonialAnimations)
  observer.register(partnersAnimations)
}
