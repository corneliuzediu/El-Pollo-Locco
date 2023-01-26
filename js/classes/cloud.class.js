class Cloud extends MovableObject {
    /***    Variables   ***/
    width = 500;
    height = 300;
    y = 20;
    speed = 0.1;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * level_end_x;
        this.animate();
    };


    animate() {
        this.moveLeft();
    };
}