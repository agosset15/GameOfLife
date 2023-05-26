const socket = io();
const side = 10;
var matrix = [];
var season;
var isCanvasCreated = false;

function setup() {

    const weatherText = document.getElementById('weather');

    const grassCount = document.getElementById('grassCount');
    const grassEaterCount = document.getElementById('grassEaterCount');
    const predatorCount = document.getElementById('predatorCount');
    const destroyerCount = document.getElementById('destroyerCount');
    const grenadeCount = document.getElementById('grenadeCount');
    const fireCount = document.getElementById('fireCount');

    const currentGrassCount = document.getElementById('currentGrassCount');
    const currentGrassEaterCount = document.getElementById('currentGrassEaterCount');
    const currentPredatorCount = document.getElementById('currentPredatorCount');
    const currentDestroyerCount = document.getElementById('currentDestroyerCount');
    const currentGrenadeCount = document.getElementById('currentGrenadeCount');
    const currentFireCount = document.getElementById('currentFireCount');

    socket.on("matrix", drawCreatures);

    function drawCreatures(data) {

        matrix = data.matrix;
        season = data.seasonTheme;
        creatures = data.creatures;

        if (!isCanvasCreated) {
            createCanvas(matrix.length * side + 1, matrix.length * side + 1);
            document.getElementById('footer').appendChild(document.getElementById('defaultCanvas0'));
            isCanvasCreated = true;
        }

        drawChart(data.chartForm, season);

        weatherText.innerText = "Сезон: " + data.seasonName;

        grassCount.innerText = data.gameData.grassCount;
        grassEaterCount.innerText = data.gameData.grassEaterCount;
        predatorCount.innerText = data.gameData.predatorCount;
        destroyerCount.innerText = data.gameData.destroyerCount;
        grenadeCount.innerText = data.gameData.grenadeCount;
        fireCount.innerText = data.gameData.fireCount;

        currentGrassCount.innerText = creatures.grasses.length;
        currentGrassEaterCount.innerText = creatures.grassEaters.length;
        currentPredatorCount.innerText = creatures.predators.length;
        currentDestroyerCount.innerText = creatures.destroyers.length;
        currentGrenadeCount.innerText = creatures.grenades.length;
        currentFireCount.innerText = creatures.fires.length;

        background('#8f8f8f');

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix.length; x++) {
                if (matrix[y][x] == 0) fill("#8f8f8f");
                else if (matrix[y][x] == 1) fill(season.grassColor);
                else if (matrix[y][x] == 2) fill(season.grassEaterColor);
                else if (matrix[y][x] == 3) fill(season.predatorColor);
                else if (matrix[y][x] == 4) fill(season.destroyerColor);
                else if (matrix[y][x] == 5) fill(season.grenadeColor);
                else if (matrix[y][x] == 6) fill(season.fireColor);
                rect(x * side, y * side, side, side);
            }
        }

    }

    function drawChart(gameData, seasonTheme) {

        var chart = d3.select("svg");

        chart.selectAll("*").remove();

        var width = chart.attr("width");
        var height = chart.attr("height");
        var radius = Math.min(width, height) / 2;
        var g = chart.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal([seasonTheme.grassColor, seasonTheme.grassEaterColor, seasonTheme.predatorColor, seasonTheme.destroyerColor, seasonTheme.grenadeColor]);

        var pie = d3.pie()
            .sort(null)
            .value(function (d) { return d.value; })

        var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        var data_ready = pie(d3.entries(gameData))

        var arcs = g.selectAll("arc")
            .data(data_ready)
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path").attr("fill", function (d, i) {
            return color(i);
        }).attr("d", arc);

        arcs.append("text")
            .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
            .text(function (d) {
                switch (d.data.key) {
                    case "grass":
                        return "Трава";
                    case "grassEater":
                        return "Травоядное";
                    case "predator":
                        return "Хищник";
                    case "destroyer":
                        return "Разрушитель";
                    case "grenade":
                        return "Граната";
                    case "fire":
                        return "Огонь";
                    default:
                        return "Неизвестный";
                }
            });
    }

}

function restart() {
    socket.emit("restart");  
}

function addGrass() {
    socket.emit("addGrass");
}

function addGrassEater() {
    socket.emit("addGrassEater");
}

function addPredator() {
    socket.emit("addPredator");
}

function changeSeason() {
    socket.emit("changeSeason");
}