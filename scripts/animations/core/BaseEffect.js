export class BaseEffect {
  static defaultConfig = {}

  _animationConfig = BaseEffect.defaultConfig

  get animationConfig() {
    return this._animationConfig
  }

  start() {
    anime(this.animationConfig)
  }
}
