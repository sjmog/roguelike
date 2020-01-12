// wraps the World in something responsible for meta-world stuff
// e.g. keyboard controls, setting up the canvas
export default class Game {
  constructor(opts) {
    this.world = opts.world

    if(opts.frameCount) { this.frameCount = 0 } else { this.frameCount = null }
  }

  setup(canvas, window) {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    window.addEventListener('keydown', (event) => { this.world.keyPresses.push(event.key) })
  }

  tick(window) {
    if(!this.world.paused) {
      this.showFrameCountIfEnabled()

      this.world.clear()
      this.world.move()
      this.world.draw()

      window.requestAnimationFrame(() => this.tick(window))
    }
  }

  showFrameCountIfEnabled() {
    if(this.frameCount) { this.frameCount++; console.log(`Frame ${ this.frameCount }`) }
  }
}