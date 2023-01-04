class Coin extends MovableObject {
    height = 80;
    width = 60;

    IMAGES = [
        'img/8_coin/coin_1.png'
    ]

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 300 + Math.random() * 1000; // zahl zwichen 200 und 700
        this.y = 200 + Math.random() * 100; 
        // this.animate();
    }


}