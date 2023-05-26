let season = "summer"
let dro = true

let winter = document.getElementById("winter")

function changeSeasonWinter() {
    season = 'winter'
}

winter.addEventListener("click", changeSeasonWinter)

let summer = document.getElementById("summer")

function changeSeasonSummer() {
    season = 'summer'
}

summer.addEventListener("click", changeSeasonSummer)

let spring = document.getElementById("spring")

function changeSeasonSpring() {
    season = 'spring'
}

spring.addEventListener("click", changeSeasonSpring)

let osen = document.getElementById("osen")

function changeSeasonOsen() {
    season = 'osen'
}

osen.addEventListener("click", changeSeasonOsen)

let dr = document.getElementById("draw")

function changeDr() {
    dro = !dro
}

dr.addEventListener("click", changeDr)