class Level {
    ground;
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    energyRate;
    level_end_x;

    constructor(ground, enemies, clouds, backgroundObjects, coins, bottles, energyRate, level_end_x){
        this.ground = ground;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.energyRate = energyRate;
        this.level_end_x = level_end_x;
    }
}