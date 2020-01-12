import TILE from '../utils'

export default class Entity {
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

export class Impassable extends Entity {
  constructor(opts) {
    super({ x: opts.x, y: opts.y, width: opts.width, height: opts.height, color: '#f0f0f0', speed: 0 })

    this.collisionEvent = { type: 'resetMove' }
  }
}

export class House extends Entity {
  constructor(opts) {
    super({ x: opts.x, y: opts.y, height: TILE(2), width: TILE(2), color: '#faafaa', speed: 0 })
  }
}

export class Character extends Entity {
  constructor(opts) {
    super({ x: opts.x, y: opts.y, height: TILE(1), width: TILE(1), color: '#ffaffa', speed: TILE(0.2) })
  }

  collidesWith(entity) {
    return (this.y + this.height > entity.y) && (this.y < entity.y + entity.height) && (this.x + this.width > entity.x) && (this.x < entity.x + entity.width)
  }
}

export class Road extends Entity {
  constructor(opts) {
    super({ x: opts.x, y: opts.y, width: opts.lengthX, height: opts.lengthY, color: '#affaff', speed: 0 })
  }
}