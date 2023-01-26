class Chicken extends MovableObject {
    /***    Images for animations   ***/
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];


    IMAGE_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    /***    Variables   ***/
    y = 355;
    height = 80;
    width = 60;
    speed = 0.1;
    crashed = false;
    walkingInterval;


    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 300 + Math.random() * level_end_x;
        this.speed = 0.1 + Math.random() * 0.3;
        this.animateChicken();
    }

    animateChicken() {
        this.setIntervalFrame(() => this.getChickenStatus(), 100);
    };


    getChickenStatus() {
        if (this.chickenAlive())
            this.moveLeft();
        else if (this.chickenDead())
            this.chickenToHeaven();
    };


    chickenAlive() {
        return !this.crashed;
    };


    moveLeft() {
        this.playAnimation(this.IMAGES_WALKING);
        super.moveLeft();
    };


    chickenDead() {
        return this.crashed;
    };


    chickenToHeaven() {
        this.playAnimation(this.IMAGE_DEAD);
        setTimeout(() => this.y = -500, 100);
    };


    resetChicken() {
        this.crashed = false;
        this.y = 355;
        this.x = 300 + Math.random() * level_end_x;
        this.speed = 0.1 + Math.random() * 0.3;
    };
};
