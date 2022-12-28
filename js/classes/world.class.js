class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;dwad
    keyboard;
    camera_x = -100;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }


    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach( (enemy) => {
                if(this.character.isColliding(enemy)){
                    this.character.hit();
                    console.log ('Colliding with the enemy', this.character.energy);
                }
            })
        }, 100)
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);

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
}