const _ = require('lodash')

export default class World {
  constructor(opts) {
    this.context = opts.context
    this.entities = opts.entities
    this.character = opts.character
    this.keyPresses = []
    this.paused = false
  }

  clear() {
    this.context.clearRect(0, 0, window.innerHeight, window.innerWidth)
  }

  handleCollisions() {
    const collisions = []

    const EVENTS = {
      resetMove: (world) => { world.entities = world.previousEntities }
    }

    this.entities.forEach(entity => {
      if(entity.collisionEvent && this.character.collidesWith(entity)) {
        collisions.push(entity.collisionEvent)
      }
    })

    // can sort collisions later if we want some events to happen before others
    collisions.forEach(collisionEvent => EVENTS[collisionEvent.type](this))
  }

  handleKeys() {
    this.keyPresses.forEach(key => {
      const KEY_MAP = {
        ArrowUp:    { x:  0, y:  1 },
        ArrowDown:  { x:  0, y: -1 },
        ArrowLeft:  { x:  1, y:  0 },
        ArrowRight: { x: -1, y:  0 }
      }

      this.entities.forEach(entity => entity.move(KEY_MAP[key], this.character.speed))
    })

    this.keyPresses = []
  }

  pause() {
    this.paused = true
  }

  move() {
    this.previousEntities = _.cloneDeep(this.entities)
    this.handleKeys()
    this.handleCollisions()
  }

  draw() {
    this.entities.forEach(entity => entity.draw(this.context))
    this.character.draw(this.context)
  }
}