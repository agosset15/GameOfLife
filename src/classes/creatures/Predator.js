const LivingCreature = require('./LivingCreature');
const random = require('../util/Random');

module.exports = class Predator extends LivingCreature {

    constructor(x, y) {
        super(x, y);
        this.energy = 20;
        matrix[y][x] = 3;
        creatures.addPredator(this);
        gameData.addPredator();
    }

    updateDirections() {
        this.directions = [ 
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(number) {
        this.updateDirections();
        return super.chooseCell(number);
    }

    start() {
        if (this.chooseCell(2).length > 0) {
            this.eat()
        }
        else if (this.chooseCell(0).length > 0) {
            this.move();
        }
        else {
            this.energy -= 0.2;
        }
        if (this.energy >= 20) {
            this.mult()
        }
        if (this.energy <= 0) {
            this.remove()
        }
    }

    move() {
        let emptyCells = this.chooseCell(0);
        let randIndex = random(emptyCells.length - 1);
        let x = emptyCells[randIndex][0];
        let y = emptyCells[randIndex][1];
        matrix[y][x] = 3;
        matrix[this.y][this.x] = 0;
        this.x = x;
        this.y = y;
        this.energy -= global.getGameManager().predatorPerMoveEnergy;
    }

    eat() {
        let foods = this.chooseCell(2);
        let randIndex = random(foods.length - 1);
        let x = foods[randIndex][0];
        let y = foods[randIndex][1];
        for (const i in creatures.grassEaters) {
            if (!(creatures.grassEaters[i].x == x && creatures.grassEaters[i].y == y)) continue;
            creatures.grassEaters.splice(i, 1);
        }
        matrix[y][x] = 3;
        matrix[this.y][this.x] = 0;
        this.energy += global.getGameManager().predatorPerEatEnergy;
        this.x = x;
        this.y = y;
    }

    mult() {
        if (this.energy < 30) return;
        var emptyCells = this.chooseCell(0);
        var randIndex = random(emptyCells.length - 1);
        let x = emptyCells[randIndex][0];
        let y = emptyCells[randIndex][1];
        matrix[this.y][this.x] = 3;
        new Predator(x, y);
        this.energy -= 5;
    }

    remove() {
        if (this.energy > 0) return;
        matrix[this.y][this.x] = 0;
        for (var i in creatures.predators) {
            if (!(this.x == creatures.predators[i].x && this.y == creatures.predators[i].y)) continue;
            creatures.predators.splice(i, 1);
            break;
        }
    }

}