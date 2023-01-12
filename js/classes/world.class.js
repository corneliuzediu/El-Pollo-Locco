class World {
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




    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.draw();
        this.setWorld();
        this.runCollisions();
    }

    setWorld() {
        this.character.world = this;
    }


    setCollision() {
        this.throwableObject.world = this;
    }


    runCollisions() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrow();

        }, 20)
    }

    checkCollisions() {
        this.checkCollisionsEnemies();
        this.checkCollisionsCoins();
        this.checkCollisionsBottles();
        this.checkCollisionsBottlesEnemies();
        this.checkCollisionsBottlesEndBoss();
        this.checkCollisionsBottlesFloor();
        this.checkPositionOnMap();
    }



    checkThrow() {
        if (this.keyboard.SPACE && !this.character.otherDirection && this.character.bottleFuel != 0 && this.timeThrow(400)) {
            let bottle = new ThrowableObject(this.character.x + 30, this.character.y + 70, this.character.otherDirection);
            this.throw(bottle);
            this.previousThrow = new Date().getTime();
        } else if (this.keyboard.SPACE && this.character.otherDirection && this.character.bottleFuel != 0) {
            let bottle = new ThrowableObject(this.character.x - 30, this.character.y + 70, this.character.otherDirection);
            this.throw(bottle);
            this.previousThrow = new Date().getTime();
        }
    }


    throw(bottle) {
        this.character.bottleFuel -= 1;
        this.bottleBar.setAmount(this.character.bottleFuel, this.level.maxAmount);
        this.throwableObject.push(bottle);
    }


    timeThrow(ms) {
        let timeGap = new Date().getTime() - this.previousThrow;
        return timeGap > ms;
    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.backgroundObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);
        this.addObjectToMap(this.level.ground);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.endBoss);
        this.addObjectToMap(this.level.bossTotalLife);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        //draw() wird immer wieder angerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        })
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            mo.flipImg(this.ctx);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            mo.removeFlipImg(this.ctx)
        }
        mo.drawFrame(this.ctx);

    }


    initlevel() {
        if (currentLevel == level2) {
            initlevel2();
        } else if (currentLevel == level3) {
            initlevel3();
        } else if (currentLevel == level4) {
            initlevel4();
        } else if (currentLevel == level5) {
            initlevel5();
        } else {
            initlevel1();
        }
    }

    stopMovement(bottle, floor, i) {
        bottle.y = floor.y * i - bottle.height / 2;
        bottle.collision = true;
        bottle.inAir = false;
        bottle.acceleration = 0;
        bottle.speedX = 0;
        bottle.speedY = 0;
        // setTimeout(() => {
        //     bottle.y = -500;
        // }, 1)
    }

    // stopMovementBoss(bottle, floor) {
    //     bottle.y = floor.y + bottle.height / 2;
    //     bottle.collision = true;
    //     bottle.inAir = false;
    //     bottle.acceleration = 0;
    //     bottle.speedX = 0;
    //     bottle.speedY = 0;
    //     // setTimeout(() => {
    //     //     bottle.y = -500;
    //     // }, 1)
    // }


    checkCollisionsEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingCharacterEnemy(enemy) && !this.character.isCollidingCharacterEnemyFromBottom(enemy) && !enemy.crashed) {
                enemy.crashed = false;
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            } else if (this.character.isCollidingCharacterEnemyFromBottom(enemy)) {
                enemy.crashed = true;
            }
        })
    }


    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isCollidingCharacterResources(coin)) {
                this.character.collectCoins();
                coin.y = -500;
                this.coinBar.setAmount(this.character.coinsBag, this.level.maxAmount);
            }
        })
    }


    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isCollidingCharacterResources(bottle)) {
                this.character.collectBottle();
                bottle.y = -500;
                this.bottleBar.setAmount(this.character.bottleFuel, this.level.maxAmount);
            }
        })
    }


    checkCollisionsBottlesEnemies() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                // console.log('Enemy:', enemy.x, enemy.y)
                // console.log('Bottle:', bottle.x, bottle.y)
                if (enemy.isCollidingCharacterEnemy(bottle)) {
                    this.stopMovement(bottle, enemy, 1);
                    // console.log('Enemy:', enemy.x, enemy.y)
                    // console.log('Bottle:', bottle.x, bottle.y)
                    if (enemy.constructor.name == "EndBoss") {
                        bottle.x = enemy.center_x;
                        bottle.y = enemy.center_y;
                    }
                }
            });
        })
    }

    checkCollisionsBottlesFloor() {
        this.throwableObject.forEach((bottle) => {
            this.level.ground.forEach((floor) => {
                // console.log('Enemy:', floor.x, floor.y)
                // console.log('Bottle:', bottle.x, bottle.y)
                if (floor.isCollidingGround(bottle)) {
                    this.stopMovement(bottle, floor, 1); a
                }
            });
        });
    }

    checkCollisionsBottlesEndBoss() {
        this.throwableObject.forEach((bottle) => {
            this.level.endBoss.forEach((boss) => {
                if (boss.isCollidingCharacterEnemy(bottle)) {
                    this.stopMovement(bottle, boss, 1.5);
                    this.hitBoss++
                    boss.hitBoss(this.hitBoss);
                    console.log(this.hitBoss);
                    return;
                };
            });
        });
    }


    checkPositionOnMap() {
        if (this.character.x >= level_end_x * 0.8) {
            this.level.bossTotalLife.forEach((life) => {
                life.getPosition(this.character.x)
            })
        }
        if (this.level.endBoss[0].energy <= 75 && this.hits == 0) {
            this.hits++;
            this.level.bossTotalLife.pop();
        } else if (this.level.endBoss[0].energy < 40 && this.hits == 1) {
            this.hits++
            this.level.bossTotalLife.pop();
        } else if (this.level.endBoss[0].energy < 1 && this.hits == 2) {
            this.level.bossTotalLife.pop();
        }
    }


}