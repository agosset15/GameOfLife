const Grass = require('../creatures/Grass');
const GrassEater = require('../creatures/GrassEater');
const Predator = require('../creatures/Predator');
const Destroyer = require('../creatures/Destroyer');
const Grenade = require('../creatures/Grenade');
const random = require('./Random');
const Fire = require('../creatures/Fire');

module.exports = function createMatrix(size, grassesAmount, grassEatersAmount, predatorsAmount, destroyersAmount, grenadesAmount, firesAmount) {

    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) matrix[i].push(0);
    }

    for (let i = 0; i < grassesAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) new Grass(x, y);
        else i--;
    }

    for (let i = 0; i < grassEatersAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) new GrassEater(x, y);
        else i--;
    }

    for (let i = 0; i < predatorsAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) new Predator(x, y);
        else i--;
    }

    for (let i = 0; i < destroyersAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) new Destroyer(random(matrix.length - 1));
        else i--;
    }

    for (let i = 0; i < grenadesAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) new Grenade(x, y);
        else i--;
    }

    for (let i = 0; i < firesAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) new Fire(x, y);
        else i--;
    }

}