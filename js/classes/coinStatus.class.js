class CoinBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
        
    ];

    amount = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 40;
        this.width = 150;
        this.height = 50;
        this.setAmount(0);
    }


    setAmount(amount) {
        this.amount = amount;
        let path = this.IMAGES[this.getImageIndex()];
        this.img = this.imageCache[path];
    }

    getImageIndex() {
        if (this.amount == 100) {
            return 5;
        } else if (this.amount > 80) {
            return 4;
        } else if (this.amount > 60) {
            return 3;
        } else if (this.amount > 40) {
            return 2;
        } else if (this.amount > 15) {
            return 1;
        } else {
            return 0;
        }
    }

    
}
