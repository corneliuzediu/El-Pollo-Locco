let level1 = 'level1';
let multiplier = 6;
let enemies = [];
let coins = [];
let bottles = [];
let clouds = [];
let background = [];
function initlevel1() {
    getEnemies();
    getCoins();
    getBottles();
    getClouds();
    getBackGround();
    return level1 = new Level(
        enemies,
        clouds,
        background,
        coins,
        bottles
    );
}

function getEnemies() {
    for (let i = 0; i <= multiplier; i++) {
        enemies.push(new Chicken());
    };
    enemies.push(new EndBoss());
}


function getCoins() {
    for (let i = 0; i < multiplier; i++) {
        coins.push(new Coin());
    }
}


function getBottles(){
    for (let i = 0; i < 5; i++) {
        bottles.push(new Bottle());
    }
}


function getClouds() {
    for (let i = 0; i < multiplier / 2; i++) {
        clouds.push(new Cloud());
    }
}


function getBackGround() {
    for (let i = 0; i < multiplier ; i++) {
        let x = i % 2;
        if ( x == 0) {
            let position = -719 + (i * 719);
            background.push(new BackgroundObject('/img/5_background/layers/air.png', position));
            background.push(new BackgroundObject('img/5_background/layers/3_third_layer/1.png', position));
            background.push(new BackgroundObject('img/5_background/layers/2_second_layer/1.png', position));
            background.push(new BackgroundObject('img/5_background/layers/1_first_layer/1.png', position));
        } else if (x == 1) {
            let position = -719 + (i * 719);
            background.push(new BackgroundObject('/img/5_background/layers/air.png', position));
            background.push(new BackgroundObject('img/5_background/layers/3_third_layer/2.png', position));
            background.push(new BackgroundObject('img/5_background/layers/2_second_layer/2.png', position));
            background.push(new BackgroundObject('img/5_background/layers/1_first_layer/2.png', position));
        }
    }
}
