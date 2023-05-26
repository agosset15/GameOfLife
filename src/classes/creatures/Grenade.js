const LivingCreature = require('./LivingCreature');
const random = require('../util/Random');

module.exports = class Grenade extends LivingCreature {

    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.bursted = false;
        this.multiplayCooldown = 10;
        this.cooldown = 10;
        this.disappearCooldown = 5;
        matrix[y][x] = 5;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ]
        creatures.addGrenade(this);
        gameData.addGrenade();
    }

    start() {
        this.cooldown--;
        this.multiplayCooldown--;
        if (this.bursted) this.disappearCooldown--;
        if (this.multiplayCooldown <= 0) {
            this.multiplayCooldown = 10;
            this.mult();
        }
        if (this.cooldown <= 0) {
            this.burst();
        }
        if (this.disappearCooldown <= 0) {
            this.remove();
        }
    }

    mult() {
        let cells = super.chooseCell(0, 1);
        if (cells.length == 0) return;
        let randIndex = random(cells.length - 1);
        let x = cells[randIndex][0];
        let y = cells[randIndex][1];
        new Grenade(x, y);
    }

    remove() {
        for (const d in this.directions) {
            let x = this.directions[d][0];
            let y = this.directions[d][1];
            if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
            matrix[y][x] = 0;
        }
        matrix[this.y][this.x] = 0;
        for (var i in creatures.grenades) {
            if (!(this.x == creatures.grenades[i].x && this.y == creatures.grenades[i].y)) continue;
            creatures.grenades.splice(i, 1);
            break;
        }
    }

    burst() {
        matrix[this.y][this.x] = 5;
        for (const i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
            matrix[y][x] = 5;
            this.removeObject(x, y)
        }
        this.bursted = true;
    }

    removeObject(x, y) {
        for (const i in creatures.grassEaters) {
            if (!(creatures.grassEaters[i].x == x && creatures.grassEaters[i].y == y)) continue;
            creatures.grassEaters.splice(i, 1);
        }
        for (const i in creatures.predators) {
            if (!(creatures.predators[i].x == x && creatures.predators[i].y == y)) continue;
            creatures.predators.splice(i, 1);
        }
    }

}