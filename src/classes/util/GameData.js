module.exports = class GameData {

    constructor() {
        this.grassCount = 0;
        this.grassEaterCount = 0;
        this.predatorCount = 0;
        this.destroyerCount = 0;
        this.grenadeCount = 0;
        this.fireCount = 0;
    }

    addGrass() {
        this.grassCount++;
    }

    addGrassEater() {
        this.grassEaterCount++;
    }

    addPredator() {
        this.predatorCount++;
    }

    addDestroyer() {
        this.destroyerCount++;
    }

    addGrenade() {
        this.grenadeCount++;
    }

    addFire() {
        this.fireCount++;
    }

}