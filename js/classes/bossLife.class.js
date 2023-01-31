class BossLife extends MovableObject {
    height = 80;
    width = 80;
    x = endBoss[endBoss.length - 1].x + endBoss[endBoss.length - 1].width;
    y = 0 + this.width;


    IMAGES = [
        './img/7_statusbars/3_icons/icon_health_endboss.png',
        './img/7_statusbars/3_icons/icon_health_endboss.png'
    ]

    constructor(i) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES)
        this.y = this.height * i;
    }
}