class Chicken extends MovableObject {
    y = 370;
    height = 80;
    width = 60;
    speed = 0.1;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * level_end_x; // zahl zwichen 200 und 700
        this.speed = 0.1 + Math.random() * 0.3;
        this.animate();

        // this.moveLeft(this.x)
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 10);

        setInterval(() => {
            
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 8);
    }

}
