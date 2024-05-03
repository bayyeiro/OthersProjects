const grid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 2, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1],
  [1, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 1],
  [1, 0, 1, 2, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 1, 2, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

let isPause = false

const gamecontent = document.querySelector('.play-in')
const draw = () => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const title = grid[y][x] == 0 ? 'grass' : grid[y][x] == 1 ? 'brick' : 'wall';
      const div = document.createElement('div')
      div.className = `list block${y}${x} ${title}`
      gamecontent.appendChild(div);
    }
  }
}
draw()
const gridNodes = document.querySelectorAll(".list");
const gridArray = Array.from(gridNodes);
const keys = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  space: 32
};
function move(direction, classe) {
  let div = document.querySelector(classe)
  if (div != null) {
    const position = div.getBoundingClientRect()
    let y = Math.floor((position.top - 150) / 50) + 1
    let x = Math.floor((position.left - 150) / 50) + 1
    const transformMatrix = new DOMMatrix(getComputedStyle(div).transform); // Obtient la matrice de transformation
    let x_axis = transformMatrix.e; // Récupère la valeur de translation en X
    let y_axis = transformMatrix.f; // Récupère la valeur de translation en Y
    switch (direction) {
      case 'left':
        x_axis -= 50
        x -= 1
        break;
      case 'up':
        y_axis -= 50
        y -= 1
        break;
      case 'right':
        x_axis += 50
        x += 1
        break;
      case 'down':
        y_axis += 50
        y += 1
        break;
    }
    if (grid[y][x] == 0) {
      div.style.transform = `translate(${x_axis}px, ${y_axis}px)`
    }
  }
}


class bomberman {
  constructor() { }
  createactor = () => {
    let div = document.createElement('img')
    div.classList.add('actor')
    div.src = 'img/man.png'
    gridArray[22].appendChild(div)
  }

  handleKey(e) {
    if (!isPause) {
      switch (e.keyCode) {
        case keys.left:
          move('left', '.actor');
          break;
        case keys.up:
          move('up', '.actor');
          break;
        case keys.right:
          move('right', '.actor');
          break;
        case keys.down:
          move('down', '.actor');
          break;
      }
    }

  }
}

let life = 5
let score = 0
const BombTheActor = (bomb, actor, divOflife) => {
  let postbomb = bomb.getBoundingClientRect()
  let postactor = actor.getBoundingClientRect()
  if (((postbomb.left == postactor.left) && (postbomb.top == postactor.top)) || ((postbomb.left == postactor.left) && ((postbomb.top == postactor.top + 50) || ((postbomb.top == postactor.top - 50)))) || (((postbomb.left + 50 == postactor.left) || (postbomb.left - 50 == postactor.left)) && (postbomb.top == postactor.top))) {
    life -= 1
    actor.style.animation = 'fadeIn 4s ease-in-out'
    if (life > 0) {
      divOflife.textContent = `${life - 1}`
      // actor.style.animation = ''
    } else {
      alert('Game Over...')
    }
  }
  setTimeout(() => {
    actor.style.animation = ''
    actor.offsetWidth;
  }, 2000)
}
let playerIsDead = false;
const ghostoActor = (ghosts, actor, divOflife) => {
  let postghost = ghosts.getBoundingClientRect()
  let postactor = actor.getBoundingClientRect()
  if (((postghost.left == postactor.left) && (postghost.top == postactor.top))) {
    if (!playerIsDead) {
      playerIsDead = true;
      // Wait for 2 seconds before allowing the player to be killed again
      actor.style.animation = 'fadeIn 2s ease-in-out'
      setTimeout(() => {
        playerIsDead = false;
        actor.style.animation = ''
        life -= 1
        if (life > 0) {
          divOflife.textContent = `${life - 1}`
        } else {
          alert('Game Over...')
        }
      }, 2000); // 2000 milliseconds = 2 seconds
    }
  }
}
class ghost {
  constructor(index) {
    this.index = index
  }
  createghost = () => {
    let div = document.createElement('img')
    div.src = "img/ghost.png"
    div.classList.add('ghost', `i-${this.index}`)
    gridArray[this.index].appendChild(div)
  }
  moveghost = () => {
    if (!isPause) {
      let position = ['left', 'down', 'right', 'up']
      let index = Math.floor(Math.random() * 5)
      let choice = position[index - 1]
      move(choice, `.i-${this.index}`)
      setTimeout(() => {
        requestAnimationFrame(this.moveghost)
      }, 1000 / 7)
    }
  }
  killactor = () => {
    const ghoste = document.querySelector(`.i-${this.index}`)
    const actor = document.querySelector('.actor')
    const divOflife = document.querySelector('#life')
    if (ghoste != null) {
      ghostoActor(ghoste, actor, divOflife)
    }
    setTimeout(() => {
      requestAnimationFrame(this.killactor)
    }, 90)
  }
}

let gamer = new bomberman()
gamer.createactor()
window.addEventListener("keydown", gamer.handleKey);
let arr = [new ghost(38), new ghost(109), new ghost(112), new ghost(244)]
arr.map((ghost) => {
  ghost.createghost()
  ghost.moveghost()
  ghost.killactor()
})

const criticalposition = (bomb, objetOne) => {
  let divscore = document.querySelector('#score')
  let postbomb = bomb.getBoundingClientRect()
  let postobjet = objetOne.getBoundingClientRect()
  if (((postbomb.left == postobjet.left) && (postbomb.top == postobjet.top)) || ((postbomb.left == postobjet.left) && ((postbomb.top == postobjet.top + 50) || ((postbomb.top == postobjet.top - 50)))) || (((postbomb.left + 50 == postobjet.left) || (postbomb.left - 50 == postobjet.left)) && (postbomb.top == postobjet.top))) {
    objetOne.remove()
    score += 100
    divscore.textContent = `${score}`
  }
}

let i = 0
class bomb {
  constructor() {
    this.i = i
  }
  createbomb() {
    let actor = document.querySelector('.actor')
    let content = document.querySelector('.block00')
    const position = actor.getBoundingClientRect()
    const bomb = document.createElement('div')
    bomb.classList.add('bomb', `n_${i}`)
    bomb.style.left = `${position.left}px`
    bomb.style.top = ` ${position.top}px`
    content.appendChild(bomb)
    i++
  }
  explose() {
    setTimeout(() => {
      const divOflife = document.querySelector('#life')
      const actor = document.querySelector('.actor')
      const allnode = document.querySelectorAll(".ghost");
      const allghost = Array.from(allnode);
      let div = document.querySelector(`.n_${this.i}`)
      let position = div.getBoundingClientRect()
      let y = Math.floor((position.top - 150) / 50) + 1
      let x = Math.floor((position.left - 150) / 50) + 1
      if (grid[y][x + 1] == 2) {
        gridArray[y * 21 + x + 1].style.backgroundImage = "url(img/grass.png)"
        grid[y][x + 1] = 0
      }
      if (grid[y][x - 1] == 2) {
        gridArray[y * 21 + x - 1].style.backgroundImage = "url(img/grass.png)"
        grid[y][x - 1] = 0
      }
      if (grid[y + 1][x] == 2) {
        gridArray[(y + 1) * 21 + x].style.backgroundImage = "url(img/grass.png)"
        grid[y + 1][x] = 0
      }
      if (grid[y - 1][x] == 2) {
        gridArray[(y - 1) * 21 + x].style.backgroundImage = "url(img/grass.png)"
        grid[y - 1][x] = 0
      }
      allghost.forEach(one => {
        criticalposition(div, one)
      })
      BombTheActor(div, actor, divOflife)
      div.remove()
    }, 1000)
  }
}
const bomber = (e) => {
  if (e.keyCode == 32 && !isPause) {
    const boum = new bomb()
    boum.createbomb()
    boum.explose()
  }
}
window.addEventListener("keydown", (e) => bomber(e));
const fin = () => {
  let div = document.querySelectorAll('.ghost')
  if (div.length == 0) {
    alert('You Win...')
    return 0
  }
}
let intval = setInterval(() => {
  let c = fin()
  if (c == 0) clearInterval(intval)
}, 3000)
const Timer = () => {
  let div = document.querySelector('#time')
  let time = 180
  let intervalid = setInterval(() => {
    if (!isPause) {
      div.textContent = `${time - 1}`
      time -= 1
      if (time == -1) {
        clearInterval(intervalid)
        alert('Game Over...')
      }
    }
  }, 1000)
}
Timer()


function pause() {
  const pauseButt = document.getElementById('pause').addEventListener('click', () => {
    if (!isPause) {
      isPause = true
    }
  })
}
pause()


function resume() {
  const ghosts = document.querySelectorAll('.ghost')
  const allghost = Array.from(ghosts);
  const resumeButt = document.getElementById('resume').addEventListener('click', () => {

    if (isPause) {
      isPause = false
      let arr = [new ghost(38), new ghost(109), new ghost(112), new ghost(244)]
      arr.map((ghost) => {
        ghost.moveghost()
      })
    }

  })
}

resume()
