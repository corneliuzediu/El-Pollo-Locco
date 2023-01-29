class ThrowableObject extends MovableObject {
    /***    Images for animations   ***/
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
    ];


    /***    Variables   ***/
    y = 240;
    collision = false;
    inAir = true;
    throwInterval;
    smash = new Audio('./audio/smash.mp3')


    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_COLLISION);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.throw();
        if (otherDirection) { this.throwLeft() } else { this.throwRight() }
    }

    throw() {
        let animation = setInterval(() => this.throwOutcome(animation), 75)
        intervalsID.push(animation);
    };


    throwOutcome(animation) {
        if (this.isThrowInAir())
            this.throwRotationAnimation();
        else if (this.isThrowColliding())
            this.throwCollisionOutcome(animation);
    };


    isThrowInAir() {
        return this.inAir && !this.collision;
    };


    throwRotationAnimation() {
        this.playAnimation(this.IMAGES_THROW);
    };


    isThrowColliding() {
        return this.collision && !this.inAir;
    };


    throwCollisionOutcome(animation) {
        this.playAnimation(this.IMAGES_COLLISION)
        setTimeout(() => this.y = -500, 200);
        this.smash.play();
        clearInterval(animation)
    };


    throwRight() {
        this.speedY = 40;
        this.speedX = 10
        this.applyGravity();
        setIntervalFrame(() => this.x += this.speedX, 20);
    };


    throwLeft() {
        this.speedY = 40;
        this.speedX = 10;
        this.applyGravity();
        setIntervalFrame(() => this.x -= this.speedX, 20);
    };
};