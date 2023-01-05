class ThrowableObject extends MovableObject {
    y = 240;
    collision = false;
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
        this.throw(otherDirection);

    }

    throw(otherDirection) {
        if (!otherDirection) {
            this.throwRight();
            setInterval(() => {
                this.playAnimation(this.IMAGES_THROW)
            }, 1000 );
        } else if (otherDirection) {
            this.throwLeft();
            if (!this.collision) {
                setInterval(() => {
                    this.playAnimation(this.IMAGES_THROW)
                }, 1000);
            }
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


    breakBottle(bottle) {
        if (bottle.collision) {
            this.playAnimation(this.IMAGES_COLLISION)
        }
    }





}