class BottleBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    // amount = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 160;
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
        if (this.amount >= 5) {
            return 5;
        } else if (this.amount >= 4) {
            return 4;
        } else if (this.amount >= 3) {
            return 3;
        } else if (this.amount >= 2) {
            return 2;
        } else if (this.amount >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
    
}
