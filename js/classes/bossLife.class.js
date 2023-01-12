class BossLife extends MovableObject {
    height = 80;
    width = 80;
    x = endBoss[0].x + endBoss[0].width;
    y = 100;
    goToLeft = false;

    IMAGES = [
        './img/7_statusbars/3_icons/icon_health_endboss.png',
        './img/7_statusbars/3_icons/icon_health_endboss.png'
    ]

    constructor(i) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES)
        this.y = this.height * i;
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (this.goToLeft && this.x > endBoss[0].x + endBoss[0].width) {
                this.moveLeft();
            }
        }, 20)
    }

    getPosition(position) {
        if (position >= level_end_x * 0.8) {
            this.goToLeft = true;
        } else {
            this.goToLeft = false;
        }
    }
}