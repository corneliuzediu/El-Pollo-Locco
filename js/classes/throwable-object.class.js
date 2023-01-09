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


    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_COLLISION);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.throw();
        // console.log("Initial x:", this.x)
        // console.log("Initial y:", this.y)
        if (otherDirection) { this.throwLeft() } else { this.throwRight() }
    }

    throw() {
        let x = 75;
        setInterval(() => {
            if(this.y > 350){
                debugger;
            }
            if (this.inAir && !this.collision) {
                this.playAnimation(this.IMAGES_THROW);
                console.log(this.y);
            } else if (this.collision && !this.inAir) {
                x = 170;
                this.playAnimation(this.IMAGES_COLLISION)
                setTimeout(() => {
                    this.y = -500;
                }, x * 1.1);
            }
        }, x)
        // console.log("I am after")
        // return;
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
}