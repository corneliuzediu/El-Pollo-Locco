class Chicken extends MovableObject {
    y = 380;
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.x = 300 + Math.random() * 300; // zahl zwichen 200 und 700
        this.height = 80;
        this.width = 60;

        // this.moveLeft(this.x)
    }


}
