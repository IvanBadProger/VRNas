import { startMorph } from '../baseAnimations/index.js'
import { MORPH_POINTS_CHECK_ICON } from '../constants.js'

export function startCheckIconMorph() {
  startMorph('.check-icon path', MORPH_POINTS_CHECK_ICON)
}
