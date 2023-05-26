const LivingCreature = require('./LivingCreature');
const random = require('../util/Random');

module.exports = class Grass extends LivingCreature {

    constructor(x, y) {
        super(x, y);
        this.multiplay = 0;
        matrix[y][x] = 1;
        creatures.addGrass(this);
        gameData.addGrass();
    }

    mult() {
        let multiplication = global.getGameManager().grassMultiplication;
        if (multiplication <= 0) return;
        this.multiplay++;
        if (this.multiplay < this.multiplication) return;
        let emptyCells = this.chooseCell(0);
        if (emptyCells.length > 0) {
            let randIndex = random(emptyCells.length - 1);
            let x = emptyCells[randIndex][0];
            let y = emptyCells[randIndex][1];
            matrix[y][x] = 1;
            new Grass(x, y);
            this.multiplay = 0;
        }
    }

}