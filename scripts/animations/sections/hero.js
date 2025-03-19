import {
  CountUpEffect,
  TypewriterEffect,
} from '../effects/index.js'
import { HERO as HERO_SELECTORS } from '../config/selectors.js'
import { SectionAnimation } from '../core/SectionAnimation.js'

const titleTW = new TypewriterEffect({
  selector: HERO_SELECTORS.title,
  config: {
    showCursor: true,
  },
})
const descriptionTW = new TypewriterEffect({
  selector: HERO_SELECTORS.desc,
  config: {
    showCursor: true,
  },
})
const countUp = new CountUpEffect({
  selector: HERO_SELECTORS.number,
})

export const heroAnimation = new SectionAnimation('hero')
heroAnimation.addEffect(titleTW)
heroAnimation.addEffect(descriptionTW)
heroAnimation.addEffect(countUp)
