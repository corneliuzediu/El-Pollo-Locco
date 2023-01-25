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
    outro = new Outro();
    reload = new Reload();
    a = 0;




    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.draw();
        this.setWorld();
        this.runCollisions();
        this.checkReload();
    }

    checkReload() {
        setInterval(() => {
            if (this.keyboard.RELOAD == true) {
                this.a++;
                console.log("button", this.a)
                if (this.a == 1) {
                    console.log("ar:", this.a)
                    this.restartWorld();
                    console.log("button", world)
                }
                setTimeout(() => {
                    this.a = 0
                }, 2000)
            }
        }, 100)
    }


    restartWorld() {
        this.camera_x = -100;
        this.character.resetMovableObj();
        this.character.characterReset();
        this.healthBar.setPercentage(100);
        this.coinBar.setAmount(0);
        this.bottleBar.setAmount(0);
        this.hits = 0;
        this.reload.resetReload()
        if (this.level.endBoss[0].isDead()) {

            this.level.bossTotalLife.forEach((life) => {
                life.resetBossLifePosition();
            });
        }
        this.level.endBoss[0].resetBoss();
        this.level.enemies.forEach((enemy) => {
            enemy.resetChicken();
        });
        this.level.coins.forEach((coin) => {
            coin.resetCoin();
        });
        this.level.bottles.forEach((bottle) => {
            bottle.resetBottle();
        });
        this.draw();
    }

    setWorld() {
        this.character.world = this;
    }


    setCollision() {
        this.throwableObject.world = this;
    }


    runCollisions() {
        setInterval(() => {
            if (this.keyboard.RELOAD != true) {
                this.checkCollisions();
                this.checkThrow();
            }
        }, 20)
    }

    checkCollisions() {
        this.checkCollisionsEnemies();
        this.checkCollisionsEndBoss();
        this.checkCollisionsCoins();
        this.checkCollisionsBottles();
        this.checkCollisionsBottlesEnemies();
        this.checkCollisionsBottlesEndBoss();
        this.checkCollisionsBottlesFloor();
        this.checkPositionOnMap();
        // this.checkPositionClick();
        this.checkWinOrLost();
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
        if (this.keyboard.RELOAD != true || this.keyboard.CLICK != true) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            this.ctx.translate(this.camera_x, 0);

            this.addObjectToMap(this.level.backgroundObjects);

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

            this.addToMap(this.character);

            this.ctx.translate(-this.camera_x, 0);
            this.addObjectToMap(this.level.ground);
            this.ctx.translate(this.camera_x, 0);



            this.ctx.translate(-this.camera_x, 0);

            //draw() wird immer wieder angerufen
            let self = this;
            if (this.character.isDead() && this.keyboard.RELOAD == false) {
                // setTimeout(() => {
                this.addToMap(this.outro);
                this.reload.isVisible = true;
                setInterval(() => {
                    this.addToMap(this.reload);
                })
                // }, 100)}
            } else {
                requestAnimationFrame(function () {
                    self.draw();
                });
            }
        }
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
    }


    checkCollisionsEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingCharacterEnemy(enemy) && !this.character.isCollidingCharacterEnemyFromBottom(enemy) && !enemy.crashed) {
                enemy.crashed = false;
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            } else if (this.character.isCollidingCharacterEnemyFromBottom(enemy) && this.character.isCollidingCharacterEnemyFromHorizontal(enemy) && !this.keyboard.UP) {
                enemy.crashed = true;
            }
        })
    }


    checkCollisionsEndBoss() {
        this.level.endBoss.forEach((boss) => {
            if (this.character.isCollidingCharacterEnemy(boss)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
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
                if (enemy.isCollidingCharacterEnemy(bottle)) {
                    this.stopMovement(bottle, enemy, 1);
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
                if (floor.isCollidingGround(bottle)) {
                    this.stopMovement(bottle, floor, 1);
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
                    boss.hitBoss();
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
        let maxLifes = this.level.bossTotalLife.length;
        let life = this.level.bossTotalLife;
        if (this.level.endBoss[0].energy <= 75 && this.hits == 0) {
            this.hits++;
            life[maxLifes - this.hits].y -= 500;
        } else if (this.level.endBoss[0].energy < 40 && this.hits == 1) {
            this.hits++
            life[maxLifes - this.hits].y -= 500;
        } else if (this.level.endBoss[0].energy < 1 && this.hits == 2) {
            this.hits++;
            life[maxLifes - this.hits].y -= 500;

        }
    }



    checkWinOrLost() {
        if (this.character.isDead()) {
            console.log("You Lost")
            // this.drawEnd();
        } else if (this.character.energy > 0 && endBoss[0].energy <= 0) {
            console.log("You won")
        }
    }


}