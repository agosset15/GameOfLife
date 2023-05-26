const Random = require("../util/Random");
const LivingCreature = require("./LivingCreature");

module.exports = class Fire extends LivingCreature {

    constructor(x, y) {
        super(x, y);
        for (let i = x - 5; i <= x + 5; i++) {
            for (let j = y - 5; j <= y + 5; j++) {
                this.directions.push([i, j]);
            }
        }
        this.burnedCells = [];
        creatures.addFire(this);
        gameData.addFire();
    }

    start() {
        this.remove();
        if (this.burnedCells.length > 20) {
            this.remove();
        }
        else { 
            this.burn();
        }
    }

    burn() {
        let randIndex = Random(this.directions.length - 1);
        let x = this.directions[randIndex][0];
        let y = this.directions[randIndex][1];
        if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) return;
        if (![0, 1, 2, 3].includes(matrix[y][x])) return;
        this.burnedCells.push([x, y]);
        this.removeObject(x, y);
        matrix[y][x] = 6;
    }

    remove() {
        if (this.burnedCells.length < 20) return;
        for (const i in this.burnedCells) {
            matrix[this.burnedCells[i][1]][this.burnedCells[i][0]] = 0;
        }
        for (var i in creatures.fires) {
            if (!(this.x == creatures.fires[i].x && this.y == creatures.fires[i].y)) continue;
            creatures.fires.splice(i, 1);
            break;
        }
        this.mult();
    }

    mult() {
        let cells = super.chooseCell(0, 1, 2, 3);
        if (cells.length == 0) return;
        let randIndex = Random(cells.length - 1);
        let x = cells[randIndex][0];
        let y = cells[randIndex][1];
        new Fire(x, y);
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