class World {
    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
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
        }, 100)
    }

    checkCollisions() {
        this.checkCollisionsEnemies();
        this.checkCollisionsCoins();
        this.checkCollisionsBottles();
        // this.checkCollisionsBottlesEnemies();
        this.checkCollisionsBottlesFloor();
    }



    checkThrow() {
        if (this.keyboard.SPACE && !this.character.otherDirection) {
            let bottle = new ThrowableObject(this.character.x + 30, this.character.y + 70, this.character.otherDirection, this.throwableObject.collision, this.throwableObject.inAir);
            this.throw(bottle);
            this.previousThrow = new Date().getTime();
        } else if (this.keyboard.SPACE && this.character.otherDirection) {
            let bottle = new ThrowableObject(this.character.x - 30, this.character.y + 70, this.character.otherDirection, false);
            this.throw(bottle);
            this.previousThrow = new Date().getTime();
        }
    }
    
    
    throw(bottle) {
        if (this.character.bottleFuel != 0 && this.timeThrow(200)) {
            this.character.bottleFuel -= 1;
            this.bottleBar.setAmount(this.character.bottleFuel, this.level.maxAmount);
            this.throwableObject.push(bottle);
            console.log("Worlds collision", bottle.collision)
        }
    }


    timeThrow(ms) {
        let timeGap = new Date().getTime() - this.previousThrow;
        console.log("Time Gap",timeGap);
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

    stopMovement(bottle, floor) {
        bottle.collision = true;
        bottle.inAir = false;
        bottle.throw(this.character.otherDirection, bottle.collision, bottle.inAir);
        bottle.y = floor.y - bottle.height;
        bottle.speedY = 0;
        bottle.speedX = 0;
        // console.log(bottle.collision)
        // bottle.breakBottle(bottle);
        // this.throwableObject.bre);

    }


    checkCollisionsEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingCharacter(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
        })
    }


    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isCollidingCharacter(coin)) {
                this.character.collectCoins();
                coin.y = -500;
                this.coinBar.setAmount(this.character.coinsBag, this.level.maxAmount);
            }
        })
    }


    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isCollidingCharacter(bottle)) {
                this.character.collectBottle();
                bottle.y = -500;
                this.bottleBar.setAmount(this.character.bottleFuel, this.level.maxAmount);
            }
        })
    }


    // checkCollisionsBottlesEnemies() {
    //     this.throwableObject.forEach((bottle) => {
    //         this.level.enemies.forEach((enemy) => {
    //             if (enemy.isCollidingCharacter(bottle)) {
    //                 this.stopMovement(bottle, enemy);
    //                 // console.log('Enemy:', bottle.x, bottle.y)
    //             }
    //         });
    //     })
    // }

    checkCollisionsBottlesFloor() {
        this.throwableObject.forEach((bottle) => {
            this.level.ground.forEach((floor) => {
                if (floor.isCollidingGround(bottle)) {
                    this.collision = true;
                    this.inAir = false;
                    this.stopMovement(bottle, floor);
                    console.log('Ground:', bottle.x, bottle.y, 'Speed:', bottle.speedY)
                }
            });
        });
    }
}