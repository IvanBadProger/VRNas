export class VRAnimation {
  constructor(name, startFunction) {
    this.name = name
    this.start = startFunction
    this.trigger = document.querySelector(
      `[data-animation-name=${name}]`
    )
  }
}
