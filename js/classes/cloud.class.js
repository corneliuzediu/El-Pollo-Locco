class Cloud extends MovableObject {
    width = 500;
    height = 300;
    y = 100;
    speed = 0.1;
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = 0 + Math.random() * 1000
        this.animate();

    }

    animate() {
        this.moveLeft();
    }

}