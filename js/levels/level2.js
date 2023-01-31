let level2 = 'level2';
async function initlevel2() {
    await getValues2();
    await getGround2();
    await getEnemies2();
    await getEndBoss2();
    await getBossLife2();
    await getCoins2();
    await getBottles2();
    await getClouds2();
    await getBackground2();
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
}


function getValues2() {
    multiplier += 2; //
    energyRate = 4;
    hitsBoss = 3
    level_end_x = 2000; //
    ground = [];
    enemies = [];
    endBoss = [];
    bossTotalLife = [];
    coins = [];
    bottles = [];
    clouds = [];
    background = [];
}


function getGround2() {
    ground.push(new Ground);
}
function getEnemies2() {
    for (let i = 0; i <= multiplier; i++) {
        enemies.push(new Chicken());
    };
}


function getEndBoss2() {
    endBoss.push(new EndBoss());
}


function getBossLife2() {
    for (let i = 1; i < hitsBoss + 1; i++) {
        bossTotalLife.push(new BossLife(i));
    }
}


function getCoins2() {
    for (let i = 0; i <= multiplier; i++) {
        coins.push(new Coin());
    }
}


function getBottles2() {
    for (let i = 0; i < 5; i++) {
        bottles.push(new Bottle());
    }
}


function getClouds2() {
    for (let i = 0; i < multiplier / 2; i++) {
        clouds.push(new Cloud());
    }
}


function getBackground2() {
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
