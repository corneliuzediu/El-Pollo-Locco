class World {
    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bootleBar = new BottleBar();
    throwableObject = [];




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


    runCollisions() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrow();
        }, 100)
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
        })
    }

    checkThrow() {
        if (this.keyboard.SPACE && !this.character.otherDirection) {
            let bottle = new ThrowableObject(this.character.x + 30, this.character.y + 70, this.character.otherDirection,)
            this.throwableObject.push(bottle);
        } else if (this.keyboard.SPACE && this.character.otherDirection) {
            let bottle = new ThrowableObject(this.character.x - 30, this.character.y + 70, this.character.otherDirection)
            this.throwableObject.push(bottle);
        }
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.backgroundObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bootleBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.throwableObject);

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

    // throwInterval() {
    //     let lengthObj = this.throwableObject.length;
    //     let lengthTime = this.timeThrowableObject.length;
    //     if (lengthTime > 1) {
    //         let index = lengthTime - 1;
    //         let interval = this.timeThrowableObject[index] - this.timeThrowableObject[index - 1];
    //         console.log(lengthObj)
    //         console.log(lengthTime)
    //         console.log(interval)
    //         return interval
    //     }
    // }
}