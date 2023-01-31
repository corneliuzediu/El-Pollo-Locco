class World {
    /***    Variables   ***/
    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
    hits = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObject = [];
    previousThrow = 0;
    a = 0;  // Dummy to reset boss life
    redraw = true;


    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.draw();
        this.setWorld();
        this.runCollisions();
    };


    draw() {
        if (this.canRedraw()) {
            this.clearCanvas();
            this.ctx.translate(this.camera_x, 0); //Move camera to the right;
            this.addElementsOnCanvas();
            this.ctx.translate(-this.camera_x, 0);  //Move camera to the left;
            this.redrawCanvas();
        };
    };


    canRedraw() {
        return this.redraw == true;
    };


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };


    addObjectToMap(object) {
        object.forEach(o => this.addToMap(o));
    };


    addToMap(mo) {
        if (mo.otherDirection) {
            mo.flipImg(this.ctx);
        };
        mo.draw(this.ctx);
        if (mo.otherDirection)
            mo.removeFlipImg(this.ctx)
    };


    addElementsOnCanvas() {
        this.addObjectsToMap();
        this.addResourcesBarToMap();
        this.addCharacterToMap();
        this.addGroundToMap();
    };


    addObjectsToMap() {
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.endBoss);
        this.addObjectToMap(this.level.bossTotalLife);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.throwableObject);
    };


    addResourcesBarToMap() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
    };


    addCharacterToMap() {
        this.addToMap(this.character);
    };


    addGroundToMap() {
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectToMap(this.level.ground);
        this.ctx.translate(this.camera_x, 0);
    };


    redrawCanvas() {
        //draw() wird immer wieder angerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };


    setWorld() {
        this.character.world = this;
    };


    runCollisions() {
        setIntervalFrame(() => {
            this.checkCollisions();
            this.checkThrow();
        }, 20);
    };


    checkCollisions() {
        this.checkCollisionsEnemies();
        this.checkCollisionsEndBoss();
        this.checkCollisionsCoins();
        this.checkCollisionsBottles();
        this.checkCollisionsBottlesEndBoss();
        this.checkCollisionsBottlesFloor();
        this.checkPositionOnMap();
    };


    checkCollisionsEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.isCollidingFromAside(enemy))
                this.enemyHitCharacter(enemy);
            else if (this.isCollidingFromTop(enemy))
                this.characterHitEnemy(enemy);
        });
    };


    isCollidingFromAside(enemy) {
        return this.character.canGetHit && this.character.isCollidingCharacterEnemy(enemy) && !this.character.isCollidingCharacterEnemyFromBottom(enemy) && !enemy.crashed;
    };


    enemyHitCharacter(enemy) {
        enemy.crashed = false;
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
    };


    isCollidingFromTop(enemy) {
        return this.character.isCollidingCharacterEnemyFromBottom(enemy) && this.character.isCollidingCharacterEnemyFromHorizontal(enemy) && !this.keyboard.UP;
    };


    characterHitEnemy(enemy) {
        this.character.jump();
        enemy.crashed = true;
    };


    checkCollisionsEndBoss() {
        this.level.endBoss.forEach((boss) => {
            if (this.isCollidingEndBoss(boss))
                this.bossHitCharacter();
        });
    };


    isCollidingEndBoss(boss) {
        return this.character.canGetHit && this.character.isCollidingCharacterEnemy(boss);
    };


    bossHitCharacter() {
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
    };


    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.isCollidingResources(coin))
                this.collectCoin(coin);
        });
    };


    isCollidingResources(resource) {
        return this.character.isCollidingCharacterResources(resource);
    };


    collectCoin(coin) {
        this.character.collectCoins();
        coin.y = -500;
        this.coinBar.setAmount(this.character.coinsBag, this.level.maxAmount);
    };


    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.isCollidingResources(bottle))
                this.collectBottle(bottle);
        });
    };


    collectBottle(bottle) {
        this.character.collectBottle();
        bottle.y = -500;
        this.bottleBar.setAmount(this.character.bottleFuel, this.level.maxAmount);
    };


    checkCollisionsBottlesEndBoss() {
        this.throwableObject.forEach((bottle) => {
            this.level.endBoss.forEach((boss) => {
                if (this.isCharacterHittingBoss(boss, bottle))
                    this.registerHitOnBoss(boss, bottle);
            });
        });
    };


    isCharacterHittingBoss(boss, bottle) {
        return boss.isCollidingCharacterEnemy(bottle);
    };


    registerHitOnBoss(boss, bottle) {
        this.stopMovement(bottle, boss, 1.5);
        this.hitBoss++
        boss.startBattleBoss();
    };


    checkCollisionsBottlesFloor() {
        this.throwableObject.forEach((bottle) => {
            this.level.ground.forEach((floor) => {
                if (this.isThrowOnGroun(bottle, floor)) {
                    this.stopMovement(bottle, floor, 1);
                }
            });
        });
    };


    isThrowOnGroun(bottle, floor) {
        floor.isCollidingGround(bottle);
    };


    stopMovement(bottle, floor, i) {
        bottle.y = floor.y * i - bottle.height / 2;
        bottle.collision = true;
        bottle.inAir = false;
        bottle.acceleration = 0;
        bottle.speedX = 0;
        bottle.speedY = 0;
    };


    checkPositionOnMap() {
        if (this.character.x > 0)
            this.displayBossLifeAside();
        this.removeLifeBossDisplayOnHit();
    };


    displayBossLifeAside() {
        this.level.bossTotalLife.forEach((life) => life.x = endBoss[endBoss.length - 1].x + endBoss[endBoss.length - 1].width);
    };


    removeLifeBossDisplayOnHit() {
        let maxLifes = this.level.bossTotalLife.length;
        let life = this.level.bossTotalLife;
        if (this.hasBoss70Life() || this.hasBoss40Life() || this.hasBoss00Life()) {
            this.hits++;
            life[maxLifes - this.hits].y = -600;
        };
    };


    hasBoss70Life() {
        return this.level.endBoss[endBoss.length - 1].energy <= 75 && this.hits == 0;
    };


    hasBoss40Life() {
        return this.level.endBoss[endBoss.length - 1].energy < 40 && this.hits == 1;
    };


    hasBoss00Life() {
        return this.level.endBoss[endBoss.length - 1].energy < 1 && this.hits == 2;
    };


    checkThrow() {
        if (this.canThrowRight())
            this.throwRight();
        else if (this.canThrowLeft())
            this.throwLeft();
    };


    canThrowRight() {
        return this.keyboard.SPACE && !this.character.otherDirection && this.character.bottleFuel != 0 && this.timeThrow(400) && !this.character.isDead() && !this.level.endBoss[endBoss.length - 1].isBossDead();
    };


    throwRight() {
        let bottle = new ThrowableObject(this.character.x + 30, this.character.y + 70, this.character.otherDirection);
        this.throw(bottle);
        this.previousThrow = new Date().getTime();
    };


    canThrowLeft() {
        return this.keyboard.SPACE && this.character.otherDirection && this.character.bottleFuel != 0 && this.timeThrow(400) && !this.character.isDead() && !this.level.endBoss[endBoss.length - 1].isBossDead();
    };


    throwLeft() {
        let bottle = new ThrowableObject(this.character.x - 30, this.character.y + 70, this.character.otherDirection);
        this.throw(bottle);
        this.previousThrow = new Date().getTime();
    };


    throw(bottle) {
        this.character.bottleFuel -= 1;
        this.bottleBar.setAmount(this.character.bottleFuel, this.level.maxAmount);
        this.throwableObject.push(bottle);
    };


    timeThrow(ms) {
        let timeGap = new Date().getTime() - this.previousThrow;
        return timeGap > ms;
    };


    restartWorld() {
        this.runCollisions();
        this.repositionCamera();
        this.resetMoAndCharacter();
        this.resetStatusBars();
        this.resetEndBoss();
        this.resetEnemies();
        this.resetResources();
    };


    repositionCamera() {
        this.camera_x = -50;
    };


    resetMoAndCharacter() {
        this.character.resetMovableObj();
        this.character.characterReset();
    };


    resetStatusBars() {
        this.healthBar.setPercentage(100);
        this.coinBar.setAmount(0);
        this.bottleBar.setAmount(0);
    };


    resetEndBoss() {
        this.hits = 0;
        this.level.bossTotalLife.forEach((life) => {
            this.a++;
            life.y = 0;
            life.y += life.height * this.a;
            setTimeout(() => this.a = 0, 200);
        });
        this.level.endBoss[endBoss.length - 1].resetBoss();
    };


    resetEnemies() {
        this.level.enemies.forEach((enemy) => enemy.resetChicken());
    };


    resetResources() {
        this.level.coins.forEach((coin) => coin.resetCoin());
        this.level.bottles.forEach((bottle) => bottle.resetBottle());
    };
};