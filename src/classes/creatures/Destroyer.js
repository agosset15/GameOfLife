const random = require('../util/Random');

module.exports = class Destroyer {

    constructor(y) {
        this.y = y;
        this.directions = [];
        for (let j = -2; j <= 2; j++) {
            let y = this.y + j;
            for (let x = 0; x < matrix[this.y].length; x++) {
                if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
                this.directions.push([x, y]);
            }
        }
        this.cooldown = 20;
        this.time = 5;
        creatures.addDestroyer(this);
        gameData.addDestroyer();
    }

    start() {
        this.cooldown--;
        if (this.cooldown <= 0) {
            this.destroy();
        }
        if (this.time <= 0) {
            this.mult();
            this.remove();
        }
    }

    destroy() {
        for (const d in this.directions) {
            let x = this.directions[d][0];
            let y = this.directions[d][1];
            if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
            this.removeObject(x, y);
            matrix[y][x] = 4;
        }
        this.time--;
    }

    remove() {
        for (const d in this.directions) {
            matrix[this.directions[d][1]][this.directions[d][0]] = 0;
        }
        for (var i in creatures.destroyers) {
            if (!(this.x == creatures.destroyers[i].x && this.y == creatures.destroyers[i].y)) continue;
            creatures.destroyers.splice(i, 1);
            break;
        }
        this.time = 5;
    }

    mult() {
        new Destroyer(random(matrix.length - 1));
        this.cooldown = 20;
    }

    removeObject(x, y) {
        for (const i in creatures.grasses) {
            if (!(creatures.grasses[i].x == x && creatures.grasses[i].y == y)) continue;
            creatures.grasses.splice(i, 1);
        }
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