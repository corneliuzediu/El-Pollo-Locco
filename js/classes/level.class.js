class Level {
    ground;
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 1400;

    constructor(ground, enemies, clouds, backgroundObjects, coins, bottles){
        this.ground = ground;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}