const CANVAS = document.getElementById('canvas')
const CONTEXT = CANVAS.getContext('2d')

const AGENTS = []
const HOUSES = []
const ROADS  = []

const TILE_SIZE = window.innerWidth / 64

const TILE = number => TILE_SIZE * number

let KEY_PRESSED = null

const setup = () => {
  CANVAS.height = window.innerHeight
  CANVAS.width = window.innerWidth

  AGENTS.push(new Agent({ x: TILE(10), y: TILE(9), width: TILE(1), height: TILE(1), color: '#ffaffa', speed: TILE(0.2) }))
  HOUSES.push(new House({ x: TILE(3),  y: TILE(3) }))
  HOUSES.push(new House({ x: TILE(10), y: TILE(10) }))
  ROADS.push (new Road( { x: TILE(4),  y: TILE(5), lengthX: TILE(7), lengthY: TILE(1) }))
  ROADS.push (new Road( { x: TILE(10), y: TILE(5), lengthX: TILE(1), lengthY: TILE(5) }))
}

const shiftWorld = (vector) => {
  HOUSES.forEach(house => { house.x += vector.x; house.y += vector.y })
  ROADS.forEach( road =>  { road.x += vector.x; road.y += vector.y })
}

class Agent {
  constructor(opts) {
    this.x = opts.x
    this.y = opts.y
    this.width = opts.width
    this.height = opts.height
    this.color = opts.color
    this.speed = opts.speed
  }

  move() { 
    if(KEY_PRESSED === 'ArrowUp')    { shiftWorld({ x: 0, y: this.speed  }) }
    if(KEY_PRESSED === 'ArrowDown')  { shiftWorld({ x: 0, y: -this.speed }) }
    if(KEY_PRESSED === 'ArrowLeft')  { shiftWorld({ x: this.speed,  y: 0 }) }
    if(KEY_PRESSED === 'ArrowRight') { shiftWorld({ x: -this.speed, y: 0 }) }

    KEY_PRESSED = null
 }

  draw() {
    CONTEXT.fillStyle = this.color
    CONTEXT.fillRect(this.x, this.y, this.width, this.height)
  }
}

class House extends Agent {
  constructor(opts) {
    super({ x: opts.x, y: opts.y, height: TILE(2), width: TILE(2), color: '#faafaa', speed: 0 })
  }
}

class Road extends Agent {
  constructor(opts) {
    super({ x: opts.x, y: opts.y, width: opts.lengthX, height: opts.lengthY, color: '#affaff', speed: 0 })
  }
}

const clear = () => {
  CONTEXT.clearRect(0, 0, window.innerHeight, window.innerWidth)
}

const draw = (agents) => {
  agents.forEach(agent => agent.draw())
}

const move = (agents) => {
  agents.forEach(agent => agent.move())
}

const tick = () => {
  clear()

  draw(HOUSES)
  draw(ROADS)

  move(AGENTS)
  draw(AGENTS)

  window.requestAnimationFrame(tick)
}

window.addEventListener('keydown', (event) => { KEY_PRESSED = event.key })

const start = () => {
  tick()
}

setup()
start()