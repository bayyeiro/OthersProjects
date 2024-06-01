let death = []
let isPause = false
let life = 4
let score = 0
let cunt = 0
let boum = null
let time = 180
let grid = [
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

class ghost {
    constructor(index) {
      this.index = index
    }
    createghost = () => {
      const gridNodes = document.querySelectorAll(".list");
      const gridArray = Array.from(gridNodes);
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
        }, 300)
      }
    }
    killactor = () => {
      if (!isPause) {
        const ghoste = document.querySelector(`.i-${this.index}`)
        const actor = document.querySelector('.actor')
        const divOflife = document.querySelector('#life')
        if (ghoste != null) {
          ghostoActor(ghoste, actor, divOflife)
        }
        setTimeout(() => {
          requestAnimationFrame(this.killactor)
        }, 300)
      }
    }
  }
  let pos = [] 
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
      cunt++
    }
    explose(timing) {
      requestAnimationFrame(() => {
        // Perform DOM manipulations in a batch
        setTimeout(() => {
          const gridNodes = document.querySelectorAll(".list");
          const gridArray = Array.from(gridNodes);
          const actor = document.querySelector('.actor')
          const divOflife = document.querySelector('#life')
          const allnode = document.querySelectorAll(".ghost");
          const allNodeWall = document.querySelectorAll(".wall");
          const allghost = Array.from(allnode);
          const allWall = Array.from(allNodeWall);
  
          // Get exploding div's position
          let div = document.querySelector(`.n_${this.i}`);
          if (div != null) {
            let position = div.getBoundingClientRect();
            let y = Math.floor((position.top - 150) / 50) + 1;
            let x = Math.floor((position.left - 150) / 50) + 1;
    
            // Cache grid[y] and grid[y - 1] for reuse
            const gridY = grid[y];
            const gridYMinus1 = grid[y - 1];
            const gridYMax1 = grid[y + 1];
    
            // Optimize grid checks
            if (gridY) {
              if (gridY[x + 1] == 2) {
                // Batch CSS changes
                if (!isPause) {
                  gridArray[y * 21 + x + 1].style.backgroundImage = "url(img/grass.png)";
                  gridY[x + 1] = 0;
                  pos.push(y * 21 + x + 1)
                }
              }

              if (gridY[x - 1] == 2) {
                if (!isPause) {
                  gridArray[y * 21 + x - 1].style.backgroundImage = "url(img/grass.png)";
                  gridY[x - 1] = 0;
                  pos.push(y * 21 + x - 1)
                }
              }
            }
            if (gridYMinus1 && gridYMinus1[x] == 2) {
              if (!isPause) {
                gridArray[(y - 1) * 21 + x].style.backgroundImage = "url(img/grass.png)";
                gridYMinus1[x] = 0;
                pos.push((y - 1) * 21 + x)
              }
            }
            if (gridYMax1 && gridYMax1[x] == 2) {
              if (!isPause) {
                gridArray[(y + 1) * 21 + x].style.backgroundImage = "url(img/grass.png)";
                gridYMax1[x] = 0;
                pos.push((y + 1) * 21 + x)
              }
            }
            // Optimize loops
            allghost.forEach(one => criticalposition(div, one));
            allWall.forEach(one => criticalposition1(div, one));
    
            // Perform the rest of the operations
              BombTheActor(div, actor, divOflife);
              if (!isPause) div.remove();
          }            
        }, timing);
      });
    }
  }
class bomberman {
    constructor() { }
    createactor = () => {
      const gridNodes = document.querySelectorAll(".list");
      const gridArray = Array.from(gridNodes);
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
const keys = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  space: 32
};
let playerIsDead = false;
const ghostoActor = (ghosts, actor, divOflife) => {
  let postghost = ghosts.getBoundingClientRect()
  let postactor = actor.getBoundingClientRect()
  if (((postghost.left == postactor.left) && (postghost.top == postactor.top))) {
    if (!playerIsDead) {
      playerIsDead = true;
      // Wait for 2 seconds before allowing the player to be killed again
      actor.style.animation = 'fadeIn 2s ease-in-out'
      requestAnimationFrame(() => {
        setTimeout(() => {
          playerIsDead = false;
          actor.style.animation = ''
          life -= 1
          if (life > 0) {
            divOflife.textContent = `${life}`
          } else {
            const modal = document.querySelector('.victory')
            modal.textContent = 'YOU LOST'
            gameOverWin();
          }
        }, 1000);
      }) 
    }
  }
}
const criticalposition = (bomb, objetOne) => {
  let divscore = document.querySelector('#score')
  let postbomb = bomb.getBoundingClientRect()
  let postobjet = objetOne.getBoundingClientRect()
  if (((postbomb.left == postobjet.left) && (postbomb.top == postobjet.top)) || ((postbomb.left == postobjet.left) && ((postbomb.top == postobjet.top + 50) || ((postbomb.top == postobjet.top - 50)))) || (((postbomb.left + 50 == postobjet.left) || (postbomb.left - 50 == postobjet.left)) && (postbomb.top == postobjet.top))) {
    death.push(objetOne)
    objetOne.remove()
    score += 100
    divscore.textContent = `${score}`
  }
}
const criticalposition1 = (bomb, objetOne) => {
  let divscore = document.querySelector('#score')
  let postbomb = bomb.getBoundingClientRect()
  let postobjet = objetOne.getBoundingClientRect()
  if (((postbomb.left == postobjet.left) && (postbomb.top == postobjet.top)) || ((postbomb.left == postobjet.left) && ((postbomb.top == postobjet.top + 50) || ((postbomb.top == postobjet.top - 50)))) || (((postbomb.left + 50 == postobjet.left) || (postbomb.left - 50 == postobjet.left)) && (postbomb.top == postobjet.top))) {
    score += 0
    divscore.textContent = `${score}`
  }
}

let id

const bomber = (e) => {
  if (e.keyCode == 32) {
     boum = new bomb()
    if (!isPause) {
      boum.createbomb()
      startExplosion(boum)      
    }
  }
}

const startExplosion = (boum) => {
  id = setTimeout(() => {
    if (!isPause) { 
      boum.explose(1000); // Explode the bomb
    } else {
      clearTimeout(id); // Stop the interval if paused
    }
  }, 500);
}

const BombTheActor = (bomb, actor, divOflife) => {
  let postbomb = bomb.getBoundingClientRect()
  let postactor = actor.getBoundingClientRect()
  if (((postbomb.left == postactor.left) && (postbomb.top == postactor.top)) || ((postbomb.left == postactor.left) && ((postbomb.top == postactor.top + 50) || ((postbomb.top == postactor.top - 50)))) || (((postbomb.left + 50 == postactor.left) || (postbomb.left - 50 == postactor.left)) && (postbomb.top == postactor.top))) {
    life -= 1
    actor.style.animation = 'fadeIn 2s ease-in-out'
    if (life != 0) {
      divOflife.textContent = `${life}`
      // actor.style.animation = ''
    } else {
      const modal = document.querySelector('.victory')
      modal.textContent = 'YOU LOST'
      gameOverWin();
    }
  }
  setTimeout(() => {
    actor.style.animation = ''
    // actor.offsetWidth;
  }, 300)
}
const draw = () => {
  const gamecontent = document.querySelector('.play-in')
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const title = grid[y][x] == 0 ? 'grass' : grid[y][x] == 1 ? 'brick' : 'wall';
      const div = document.createElement('div')
      div.className = `list block${y}${x} ${title}`
      gamecontent.appendChild(div);
    }
  }
}
const Timer = () => {
  let divs = document.querySelectorAll('#time')
  divs.forEach(div => {
    let intervalid = setInterval(() => {
      if (!isPause) {
        div.textContent = `${time}`
        time -= 1
        if (time == 0) {
          clearInterval(intervalid)
          const modal = document.querySelector('.victory')
          modal.textContent = 'YOU LOST'
          gameOverWin();
        }
      }
    }, 1000)
  });
}
const paused = document.getElementById('pause')
const resumed = document.getElementById('resume')

function pause() {
    document.getElementById('pause').addEventListener('click', () => {
      paused.style.display = 'none'
      resumed.style.display = 'flex'

      if (!isPause) {
        isPause = true
      }
    })
}
function resume() {
    document.getElementById('resume').addEventListener('click', () => {
    paused.style.display = 'flex'
    resumed.style.display = 'none'
    if (isPause) {
      isPause = false
      let arr = [new ghost(38), new ghost(109), new ghost(112), new ghost(244)]
      arr.map((ghost) => {
        ghost.moveghost()
        ghost.killactor()
      })
      for (let i = 0; i< cunt; i++) {
        if (boum != null) boum.explose(250)
      }
      cunt  = 0
    }
  })
}
const fin = () => {
  let div = document.querySelectorAll('.ghost')
  if (div.length == 0) {
    const modal = document.querySelector('.victory')
    modal.textContent = 'YOU WIN'
      gameOverWin();
      return 0
  }
}
function gameOverWin() {

  // Mettre à jour les éléments de score, de vie et de temps
  isPause = true
  // Afficher le modal
  let containt = document.querySelector('.containt')
  let bord = document.querySelector('.bord')
  containt.style.opacity = "0.05"
  bord.style.opacity = "0.05"
  document.getElementById('gameOverModal').style.display = "block";
}

const replace = (value, grider)  => {
  let y = Math.floor(value / 21)
  let x = value % 21
  grider[value].removeAttribute('style')
  grid[y][x] = 2
}
const live = (dead) => {
  let classname = Array.from(dead.classList)
  let index = classname[1].substr(2)
  let name = new ghost(index)
  name.createghost()
}

const reset = () => {
  const gridNodes = document.querySelectorAll(".list");
  const gridArray = Array.from(gridNodes);
 
  pos.map(value => replace(value, gridArray))
  let unique = death.filter((x, i) => death.indexOf(x) === i)
  death = []
  unique.map(scare => live(scare))

  const actor = document.querySelector('.actor')
  actor.style.transform = `translate(0px, 0px)`
  if (isPause) {
    isPause = false
    let arr = [new ghost(38), new ghost(109), new ghost(112), new ghost(244)]
    arr.map((ghost) => {
      ghost.moveghost()
      ghost.killactor()
    })
  }else {
    isPause = false
  }
  life = 4
  score = 0
  time = 180
  let divscore = document.querySelector('#score')
  divscore.textContent = '0'
  let divlife = document.querySelector('#life')
  divlife.textContent = '4'
  paused.style.display = 'flex'
  resumed.style.display = 'none'
}

const Game = () => {
    setTimeout(() =>{
       draw()
   
       let gamer = new bomberman()
       gamer.createactor()
   
       window.addEventListener("keydown", (e) => {
         bomber(e)
         gamer.handleKey(e)
       });
   
       let arr = [new ghost(38), new ghost(109), new ghost(112), new ghost(244)]
       arr.map((ghost) => {
         ghost.createghost()
         ghost.moveghost()
         ghost.killactor()
       })   
   
       let intval = setInterval(() => {
         let c = fin()
         if (c == 0) clearInterval(intval)
       }, 2000)
   
       Timer()
       pause()
       resume()
     }, 0)   }
   window.Game = Game
   setTimeout(() => {
    // const play = document.querySelector('.play-in')
    // play.style.Background = 'none'
    Game()
   }, 5000)
   
   document.querySelector('.buttonRest').addEventListener("click", () => {
       reset()
   })
   