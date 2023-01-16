class Chicken extends MovableObject {
    y = 370;
    height = 80;
    width = 60;
    speed = 0.1;
    crashed = false;
    walkingInterval;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 300 + Math.random() * level_end_x; // zahl zwichen 200 und 700
        this.speed = 0.1 + Math.random() * 0.3;
        this.animate();

        // this.moveLeft(this.x)
    }

    animate() {
       this.walkingInterval = setInterval(() => {
            if (!this.crashed) {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            } else if (this.crashed) {
                this.playAnimation(this.IMAGE_DEAD);
                setTimeout(() => {
                    this.y = -500;
                }, 100)
            }
        }, 100)
    }

    resetChicken() {
        // clearInterval(this.walkingInterval);
        this.crashed = false;
        this.y = 370;
        this.x = 300 + Math.random() * level_end_x; // zahl zwichen 200 und 700
        this.speed = 0.1 + Math.random() * 0.3;
    }

}
