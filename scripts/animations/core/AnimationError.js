export class AnimationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'Animation Error'
  }
}
