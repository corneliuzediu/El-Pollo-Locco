class ThrowableObject extends MovableObject {
    y = 240;
    collision = false;
    inAir = true;
    throwInterval; 

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    IMAGES_COLLISION = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png'
    ]


    constructor(x, y, otherDirection, collision, inAir) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_COLLISION);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        collision = this.collision;
        inAir = this.inAir;
        this.throw(otherDirection, collision, this.inAir);
    }

    throw(otherDirection, collision, inAir) {
        if (!collision && inAir) {
            this.throwAnimation(this.collision);
            this.throwRight();
        } else if (otherDirection) {
            this.throwAnimation();
            this.throwLeft();
        } else if (collision && !inAir) {
            this.throwAnimation(collision);
        }
    }

    throwRight() {
        this.speedY = 40;
        this.speedX = 10
        this.applyGravity();
        setInterval(() => {
            this.x += this.speedX;
        }, 20);

    }


    throwLeft() {
        this.speedY = 40;
        this.speedX = 10;
        this.applyGravity();
        setInterval(() => {
            this.x -= 10;
        }, 20);
    };


    throwAnimation(collision) {
        if (!collision) {
           this.startAnimation();
        } else if (collision) {
            this.stopAnimation();
            this.playAnimation(this.IMAGES_COLLISION);
            console.log("I Stop Animation")
            console.log(this);
        }
    }

    startAnimation(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROW)
        }, 1000 / 15);
    }

    stopAnimation(){
        clearInterval(this.startAnimation);
    }



    breakBottle(bottle) {
        if (bottle.collision) {
            this.playAnimation(this.IMAGES_COLLISION)
        }
    }





}