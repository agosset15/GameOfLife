let grassarr = []
let grasseaters = []
let viruses = []
let nubbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]
let side = 10

function del_eaters() {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 2) {
        matrix[y][x] = 0
      }
    }
  }
}
class LivingCreature {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1]
    ]
  }

  chooseCell(character) {
    let found = [];
    for (let i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }

  update() {
    this.directions = [
      [this.x - 1, this.y - 1], 
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1]]
  }
}

class Grass extends LivingCreature {
  constructor(x, y) {
    super(x, y)
    this.multoply = 0
    
  }

  loop() {
    this.multoply += 1
    let newCell = random(this.chooseCell(0))
    if (this.multoply >= 6 && newCell && matrix[this.y][this.x] == 1) {
      let newGrass = new Grass(newCell[0], newCell[1])
      grassarr.push(newGrass)
      matrix[newCell[1]][newCell[0]] = 1
      this.multoply = 0
    }
  }
}

class GrassEater extends LivingCreature {
  constructor(x, y) {
    super(x, y)
    this.energy = 0
  }

  loop() {
    let nearVoid = this.chooseCell(0)
    let newCell = random(nearVoid)
    let nearGrass = this.chooseCell(1)
    let nearVirus = this.chooseCell(4)
    if (this.energy <= -5) {
      this.dead(this.x, this.y)
    }
    else if (this.energy >= 5 && nearVoid.length > 0) {
      let newGrassEater = new GrassEater(newCell[0], newCell[1])
      grasseaters.push(newGrassEater)
      matrix[newCell[1]][newCell[0]] = 2
      this.energy = 0
    }
    else if (nearVirus.length > 0) {
      let vir = random(nearVirus)
      let ind = grassarr.findIndex((key) => key.x == vir[0] && key.y == vir[1])
      viruses.splice(ind, 1)
      matrix[vir[1]][vir[0]] = 0
      this.dead(this.x, this.y)
    }
    else if (nearGrass.length > 0) {
      this.eat(random(nearGrass))
    }
    else if (nearVoid.length > 0) {
      this.move(newCell[0], newCell[1])
    }


  }

  eat(tp) {
    matrix[this.y][this.x] = 0
    this.x = tp[0]
    this.y = tp[1]
    let ind = grassarr.findIndex((key) => key.x == tp[0] && key.y == tp[1])
    grassarr.splice(ind, 1)
    matrix[this.y][this.x] = 2
    this.energy++
    this.update()
  }

  move(x, y) {
    matrix[this.y][this.x] = 0
    this.x = x
    this.y = y
    matrix[y][x] = 2
    this.energy -= 1
    this.update()
  }

  dead(x, y) {
    let ind = grasseaters.findIndex((key) => key.x == x && key.y == y)
    grasseaters.splice(ind, 1)
    matrix[y][x] = 0
  }
}

class Virus extends LivingCreature {
  constructor(x, y) {
    super(x, y)
    this.energy = 0
  }

  loop() {
    let nearVoid = this.chooseCell(0)
    let nearGrass = this.chooseCell(1)
    let setGrass = random(nearGrass)
    let setVoid = random(nearVoid)
    if (matrix[this.y][this.x] == 4) {
      return
    }
    if (nearGrass.length > 0) {
      let newVirus = new Virus(setGrass[0], setGrass[1])
      viruses.push(newVirus)
      matrix[setGrass[1]][setGrass[0]] = 4
      let ggr = grassarr.findIndex((key) => key.x == setGrass[0] && key.y == setGrass[1])
      grassarr.splice(ggr, 1)
      if (this.energy >= 500) {
        console.log('Congratulations!!!');
        this.energy = 0
      }
      this.energy++
    }
    else if (this.energy <= -2) {
      this.dead(this.x, this.y)
    }
    else if (nearVoid.length > 0) {
      this.move(setVoid[0], setVoid[1])
    }
  }

  move(x, y) {
    matrix[this.y][this.x] = 0
    this.x = x
    this.y = y
    matrix[y][x] = 3
    this.energy -= 1
    this.update()
  }

  dead(x, y) {
    let ind = viruses.findIndex((key) => key.x == x && key.y == y)
    viruses.splice(ind, 1)
    matrix[y][x] = 0
  }
}

function setup() {
  createCanvas(900, 900);
  background('#acacac');
  frameRate(10)
  matrix = []
  for (let y = 0; y < 100; y++) {
    let abob = []
    for (let x = 0; x < 100; x++) {
      rnd = random(nubbers)
      abob.push(rnd)
    }
    matrix.push(abob)
  }
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < matrix[y].length; ++x) {
      if (matrix[y][x] == 1) {
        let gr = new Grass(x, y);
        grassarr.push(gr);
      }
      else if (matrix[y][x] == 2) {
        let ge = new GrassEater(x, y)
        grasseaters.push(ge)
      }
      else if (matrix[y][x] == 3) {
        let vr = new Virus(x, y)
        viruses.push(vr)
      }
    }
  }
}

function mousePressed() {
  if (mouseX < 1000 && mouseY < 1000 && mouseX > 0 && mouseY > 0) {
  console.log(mouseX, mouseY)
  let indexY = parseInt(mouseY / side)
  let indexX = parseInt(mouseX / side)
  console.log(indexY, indexX)
  if (matrix[indexY][indexX] === 1) {
  grassarr.splice(grassarr.findIndex(item => item.x === indexX && item.y === indexY), 1)
  }
  else if (matrix[indexY][indexX] === 3) {
    viruses.splice(viruses.findIndex(item => item.x === indexX && item.y === indexY), 1)
  }
  else if (matrix[indexY][indexX] === 2) {
    grasseaters.splice(grasseaters.findIndex(item => item.x === indexX && item.y === indexY), 1)
  }
  if (dro == true) {
  matrix[indexY][indexX] = 2
  let ge = new GrassEater(indexX, indexY)
  grasseaters.push(ge)
  }
  else {
    matrix[indexY][indexX] = 1
    let ge = new Grass(indexX, indexY)
    grassarr.push(ge)
  }
  }
  }

function draw() {
  // noStroke()
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        if (season == "summer") {fill('green')}
        else if (season == "winter"){fill('white')}
        else if (season == "spring"){fill('pink')}
        else if (season == "osen"){fill('red')}
      }
      else if (matrix[y][x] == 2) {
        fill('orange')
      }
      else if (matrix[y][x] == 3) {
        fill('red')
      }
      else if (matrix[y][x] == 4) {
        fill('blue')
      }
      else {
        fill('grey')
      }
      rect(x * 10, y * 10, 10, 10)
      // if (grassarr.length > 0 && grasseaters.length > 0 && viruses.length > 0){
      //     matrix[y][x] == 0
      // }
      // let ggr = grassarr.findIndex((key) => key.x == x && key.y == y)
      // if (ggr && matrix[y][x] == 1){
      //     grassarr.splice(ggr, 1)
      // }
      // let eatrs = grassarr.findIndex((key) => key.x == x && key.y == y)
      // if (!eatrs && matrix[y][x] == 2){
      //     grasseaters.splice(eatrs, 1)
      // }
      // let virs = grassarr.findIndex((key) => key.x == x && key.y == y)
      // if (!virs && matrix[y][x] == 3 || !virs && matrix[y][x] == 4){
      //     viruses.splice(virs, 1)
      // }
    }
  }
  for (let i in grassarr) {
    grassarr[i].loop()
  }
  for (let i in grasseaters) {
    grasseaters[i].loop()
  }
  for (let i in viruses) {
    viruses[i].loop()
  }
  if (grasseaters <= 0) {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 2) {
          matrix[y][x] = 0
        }
      }
    }
  }
}