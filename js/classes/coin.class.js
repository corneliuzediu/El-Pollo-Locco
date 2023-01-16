class Coin extends MovableObject {
    height = 100;
    width = 100;

    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ]

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 300 + Math.random() * (level_end_x - 300); // zahl zwichen 200 und 700
        this.y = 200 + Math.random() * 100; 
        this.animate();
    }


    animate(){
        setInterval(() =>{
            this.playAnimation(this.IMAGES_COIN);
        }, 400)
    }

    resetCoin(){
        this.x = 300 + Math.random() * (level_end_x - 300); // zahl zwichen 200 und 700
        this.y = 200 + Math.random() * 100;  
    }

}