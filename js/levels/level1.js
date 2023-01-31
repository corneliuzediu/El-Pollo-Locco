/*      Variable        */
let level1 = 'level1';
let multiplier = 6; //
let energyRate = 2;
let hitsBoss = 3;
let level_end_x = 1000;
let ground = [];
let enemies = [];
let endBoss = [];
let bossTotalLife = [];
let coins = [];
let bottles = [];
let clouds = [];
let background = [];


async function initlevel1() {
    await getLevel1();
    return new Level(
        ground,
        enemies,
        endBoss,
        bossTotalLife,
        hitsBoss,
        clouds,
        background,
        coins,
        bottles,
        energyRate,
        level_end_x
    );
};


async function getLevel1() {
    await getGround();
    await getEnemies();
    await getEndBoss();
    await getBossLife();
    await getCoins();
    await getBottles();
    await getClouds();
    await getBackground();
};


function getGround() {
    ground.push(new Ground);
};


function getEnemies() {
    for (let i = 0; i <= multiplier; i++) {
        enemies.push(new Chicken());
    };
};


function getEndBoss() {
    endBoss.push(new EndBoss());
};


function getBossLife() {
    for (let i = 1; i < hitsBoss + 1; i++) {
        bossTotalLife.push(new BossLife(i));
    };
};


function getCoins() {
    for (let i = 0; i <= multiplier; i++) {
        coins.push(new Coin());
    };
};


function getBottles() {
    for (let i = 0; i < 5; i++) {
        bottles.push(new Bottle());
    };
};


function getClouds() {
    for (let i = 0; i < multiplier / 2; i++) {
        clouds.push(new Cloud());
    };
};


function getBackground() {
    for (let i = 0; i < (level_end_x / 719) + 2; i++) {
        let x = i % 2;
        let position = -719 + (i * 719);
        if (x == 0)
            getFirstHalfBG(position);
        else if (x == 1)
            getSecondHalfBG(position);
    };
};


function getFirstHalfBG(position) {
    background.push(new BackgroundObject('./img/5_background/layers/air.png', position));
    background.push(new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', position));
    background.push(new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', position));
    background.push(new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', position));
};


function getSecondHalfBG(position) {
    background.push(new BackgroundObject('./img/5_background/layers/air.png', position));
    background.push(new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', position));
    background.push(new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', position));
    background.push(new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', position));
};


function resetLevel() {
    multiplier = 6;
    energyRate = 2;
    hitsBoss = 3
    level_end_x = 1000;
    ground = [];
    enemies = [];
    endBoss = [];
    bossTotalLife = [];
    coins = [];
    bottles = [];
    clouds = [];
    background = [];
};