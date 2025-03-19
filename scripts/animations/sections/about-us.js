import { SvgMorphEffect } from '../effects/index.js'
import { ABOUT_US as ABOUT_US_SELECTORS } from '../config/selectors.js'
import { MORPH_POINTS_CHECK_ICON } from '../config/constants.js'
import { SectionAnimation } from '../core/SectionAnimation.js'

export const aboutUsAnimation = new SectionAnimation('about-us')
const checkIconEffect = new SvgMorphEffect(
  ABOUT_US_SELECTORS.paths,
  MORPH_POINTS_CHECK_ICON
)

aboutUsAnimation.addEffect(checkIconEffect)
