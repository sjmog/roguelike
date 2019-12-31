const TILE_SIZE = window.innerWidth / 64

const TILE = number => TILE_SIZE * number

const setup = (canvas) => {
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth

  const world = new World({
    context: canvas.getContext('2d'),
    entities: [
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
  }

  clear() {
    this.context.clearRect(0, 0, window.innerHeight, window.innerWidth)
  }

  move() {
    this.keyPresses.forEach(key => {
      const KEY_MAP = {
        ArrowUp:    { x:  0, y:  1 },
        ArrowDown:  { x:  0, y: -1 },
        ArrowLeft:  { x:  1, y:  0 },
        ArrowRight: { x: -1, y:  0 }
      }

      const vector = KEY_MAP[key]

      this.entities.forEach(entity => { 
        entity.x += (vector.x * this.character.speed)
        entity.y += (vector.y * this.character.speed)
      })
    })

    this.keyPresses = []
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
  }

  draw(context) {
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Character extends Entity {
  constructor(opts) {
    super({ x: opts.x, y: opts.y, height: TILE(1), width: TILE(1), color: '#ffaffa', speed: TILE(0.2) })
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

const tick = (world) => {
  world.clear()
  world.move()
  world.draw()

  window.requestAnimationFrame(() => tick(world))
}

tick(setup(document.getElementById('canvas')))