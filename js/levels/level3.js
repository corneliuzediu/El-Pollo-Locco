let level3 = 'level3';
async function initlevel3() {
    await getLevel3();
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


async function getLevel3() {
    await getValues3();
    await getGround3();
    await getEnemies3();
    await getEndBoss3();
    await getBossLife3();
    await getCoins3();
    await getBottles3();
    await getClouds3();
    await getBackground3();
};


function getValues3() {
    multiplier += 4; //
    energyRate = 5;
    hitsBoss = 3
    level_end_x = 2500; //
    ground = [];
    enemies = [];
    endBoss = [];
    bossTotalLife = [];
    coins = [];
    bottles = [];
    clouds = [];
    background = [];
};


function getGround3() {
    ground.push(new Ground);
};


function getEnemies3() {
    for (let i = 0; i <= multiplier; i++) {
        enemies.push(new Chicken());
    };
};


function getEndBoss3() {
    endBoss.push(new EndBoss());
};


function getBossLife3() {
    for (let i = 1; i < hitsBoss + 1; i++) {
        bossTotalLife.push(new BossLife(i));
    };
};


function getCoins3() {
    for (let i = 0; i <= multiplier; i++) {
        coins.push(new Coin());
    };
};


function getBottles3() {
    for (let i = 0; i < 5; i++) {
        bottles.push(new Bottle());
    };
};


function getClouds3() {
    for (let i = 0; i < multiplier / 2; i++) {
        clouds.push(new Cloud());
    };
};


function getBackground3() {
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