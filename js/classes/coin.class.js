class Coin extends MovableObject {
    /***    Images for animations   ***/
    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];


    /***    Variables   ***/
    height = 100;
    width = 100;


    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 300 + Math.random() * (level_end_x - 300);
        this.y = 200 + Math.random() * 100;
        this.animate();
    };


    animate() {
        setIntervalFrame(() => this.playAnimation(this.IMAGES_COIN), 200); //Toogle the coins.
    };


    resetCoin() {
        this.x = 300 + Math.random() * (level_end_x - 300);
        this.y = 200 + Math.random() * 100;
        this.animate();
    };
}