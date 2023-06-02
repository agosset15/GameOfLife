module.exports = class GameManager {

    constructor(grassMultiplication, grassEaterMinRequiredEnergy, grassEaterPerEatEnergy, predatorPerEatEnergy, predatorPerMoveEnergy) {

        this.grassMultiplication = grassMultiplication; // Размножение травы
        this.grassEaterMinRequiredEnergy = grassEaterMinRequiredEnergy; // Минимальная энергия для размножения травоядных
        this.grassEaterPerEatEnergy = grassEaterPerEatEnergy; // Энергия между едой у травоядных
        this.predatorPerEatEnergy = predatorPerEatEnergy; // Энергия между едой у хищника
        this.predatorPerMoveEnergy = this.predatorPerMoveEnergy // Энергия между движением у хищника

    }

}