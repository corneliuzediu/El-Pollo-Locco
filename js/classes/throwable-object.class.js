class ThrowableObject extends MovableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];


    constructor(x, y, otherDirection) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.throw(otherDirection);
    }

    throw(otherDirection) {
        this.previousThrow();
        if (!otherDirection) {
            this.throwRight();
        } else if (otherDirection) {
            this.throwLeft();
        }
    }

    throwRight() {
        this.speedY = 40;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 20);
    }


    throwLeft() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x -= 10;
        }, 20);
    };

    previousThrow(){
        this.timeThrow = new Date().getTime();
    }

}