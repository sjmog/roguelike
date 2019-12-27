const CANVAS = document.getElementById('canvas')
const CONTEXT = CANVAS.getContext('2d')

const AGENTS = []
const HOUSES = []
const ROADS  = []

const setup = () => {
  CANVAS.height = window.innerHeight
  CANVAS.width = window.innerWidth

  AGENTS.push(new Agent(412.5, 412.5, 20, 20, '#ffaffa', 1))
  HOUSES.push(new House(100, 100))
  HOUSES.push(new House(450, 400))
  ROADS.push (new Road(150, 200, 150, 50))
  ROADS.push (new Road(250, 200, 50, 200))
  ROADS.push (new Road(250, 400, 200, 50))
}

class Agent {
  constructor(x, y, width, height, color, speed) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.speed = speed
  }

  move() {
    this.x -= this.speed
  }

  draw() {
    CONTEXT.fillStyle = this.color
    CONTEXT.fillRect(this.x, this.y, this.width, this.height)
  }
}

class House extends Agent {
  constructor(x, y) {
    super(x, y, 100, 100, '#faafaa', false)
  }
}

class Road extends Agent {
  constructor(x, y, lengthX, lengthY) {
    super(x, y, lengthX, lengthY, '#affaff', 0)
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

const start = () => {
  tick()
}

setup()
start()