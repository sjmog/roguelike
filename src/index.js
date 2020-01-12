import TILE from './utils'
import Game from './Game'
import World from './World'
import { Impassable, House, Road, Character } from './entities'

const CANVAS = document.getElementById('canvas')

const WORLD = new World({
  context: CANVAS.getContext('2d'),
  entities: [
    new Impassable({ x: TILE(11), y: TILE(5), height: TILE(4), width: TILE(1) }),
    new House({ x: TILE(3),  y: TILE(3) }),
    new House({ x: TILE(10), y: TILE(10) }),
    new Road( { x: TILE(4),  y: TILE(5), lengthX: TILE(7), lengthY: TILE(1) }),
    new Road( { x: TILE(10), y: TILE(5), lengthX: TILE(1), lengthY: TILE(5) })
  ],
  character: new Character({ x: TILE(10), y: TILE(9) }),
})

const GAME = new Game({ 
              window: window,
              frameCount: false,
              world: WORLD
            })

GAME.setup(CANVAS, window)
GAME.tick(window)