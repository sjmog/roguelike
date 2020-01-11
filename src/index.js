const _ = require('lodash')

const TILE_SIZE = window.innerWidth / 64

const TILE = number => TILE_SIZE * number

const setup = (canvas) => {
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth

  const world = new World({
    context: canvas.getContext('2d'),
    entities: [
      new Impassable({ x: TILE(11), y: TILE(5), height: TILE(4), width: TILE(1) }),
      new House({ x: TILE(3),  y: TILE(3) }),
      new House({ x: TILE(10), y: TILE(10) }),
      new Road( { x: TILE(4),  y: TILE(5), lengthX: TILE(7), lengthY: TILE(1) }),
      new Road( { x: TILE(10), y: TILE(5), lengthX: TILE(1), lengthY: TILE(5) })
    ],
    character: new Character({ x: TILE(10), y: TILE(9) })
  })

  window.addEventListener('keydown', (event) => { world.keyPresses.push(event.key) })

  return world
}

class World {
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

class Entity {
  constructor(opts) {
    this.x = opts.x
    this.y = opts.y
    this.width = opts.width
    this.height = opts.height
    this.color = opts.color
    this.speed = opts.speed

    this.collisionEvent = null
  }

  move(vector, speed) {
    this.x += (vector.x * speed)
    this.y += (vector.y * speed)
  }

  draw(context) {
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Impassable extends Entity {
  constructor(opts) {
    super({ x: opts.x, y: opts.y, width: opts.width, height: opts.height, color: '#f0f0f0', speed: 0 })

    this.collisionEvent = { type: 'resetMove' }
  }
}

class Character extends Entity {
  constructor(opts) {
    super({ x: opts.x, y: opts.y, height: TILE(1), width: TILE(1), color: '#ffaffa', speed: TILE(0.2) })
  }

  collidesWith(entity) {
    return (this.y + this.height > entity.y) && (this.y < entity.y + entity.height) && (this.x + this.width > entity.x) && (this.x < entity.x + entity.width)
  }
}

class House extends Entity {
  constructor(opts) {
    super({ x: opts.x, y: opts.y, height: TILE(2), width: TILE(2), color: '#faafaa', speed: 0 })
  }
}

class Road extends Entity {
  constructor(opts) {
    super({ x: opts.x, y: opts.y, width: opts.lengthX, height: opts.lengthY, color: '#affaff', speed: 0 })
  }
}

const tick = (world, frameCount = false) => {
  if(!world.paused) {
    if(frameCount) { frameCount++; console.log(`Frame ${ frameCount }`) }

    world.clear()
    world.move()
    world.draw()

    window.requestAnimationFrame(() => tick(world, frameCount))
  }
}

tick(setup(document.getElementById('canvas')))