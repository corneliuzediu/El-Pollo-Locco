let level1 = 'level1';
let multiplier = 6;
let energyRate = 1;
let level_end_x = 5000;
let ground = [];
let enemies = [];
let coins = [];
let bottles = [];
let clouds = [];
let background = [];
function initlevel1() {
    getGround();
    getEnemies();
    getCoins();
    getBottles();
    getClouds();
    getBackground();
    return level1 = new Level(
        ground,
        enemies,
        clouds,
        background,
        coins,
        bottles,
        energyRate,
        level_end_x
    );
}


function getGround() {
    ground.push(new Ground);
}
function getEnemies() {
    for (let i = 0; i <= multiplier; i++) {
        enemies.push(new Chicken());
    };
    enemies.push(new EndBoss());
}


function getCoins() {
    for (let i = 0; i <= multiplier; i++) {
        coins.push(new Coin());
    }
}


function getBottles() {
    for (let i = 0; i < 5; i++) {
        bottles.push(new Bottle());
    }
}


function getClouds() {
    for (let i = 0; i < multiplier / 2; i++) {
        clouds.push(new Cloud());
    }
}


function getBackground() {
    for (let i = 0; i < (level_end_x / 719) + 2; i++) {
        let x = i % 2;
        if (x == 0) {
            let position = -719 + (i * 719);
            background.push(new BackgroundObject('./img/5_background/layers/air.png', position));
            background.push(new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', position));
            background.push(new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', position));
            background.push(new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', position));
        } else if (x == 1) {
            let position = -719 + (i * 719);
            background.push(new BackgroundObject('./img/5_background/layers/air.png', position));
            background.push(new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', position));
            background.push(new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', position));
            background.push(new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', position));
        }
    }
}
