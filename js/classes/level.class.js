class Level {
    /***    Variables   ***/
    ground;
    enemies;
    endBoss;
    bossTotalLife;
    hitsBoss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    energyRate;
    level_end_x;


    constructor(ground, enemies, endBoss, bossTotalLife, hitsBoss, clouds, backgroundObjects, coins, bottles, energyRate, level_end_x) {
        this.ground = ground;
        this.enemies = enemies;
        this.endBoss = endBoss;
        this.bossTotalLife = bossTotalLife;
        this.hitsBoss = hitsBoss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.energyRate = energyRate;
        this.level_end_x = level_end_x;
    };


    getBossLifeBack() {
        this.bossTotalLife = getBossLife();
    };
}