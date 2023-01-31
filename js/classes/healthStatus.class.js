class HealthBar extends DrawableObject {
    /***    Images for animations   ***/
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];


    /***    Variables   ***/
    percentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 0;
        this.width = 150;
        this.height = 50;
        this.setPercentage(100);
    };


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.getImageIndex()];
        this.img = this.imageCache[path];
    };


    getImageIndex() {
        if (this.percentage == 100)
            return 5;
        else if (this.percentage > 75)
            return 4;
        else if (this.percentage > 50)
            return 3;
        else if (this.percentage > 35)
            return 2;
        else if (this.percentage > 0)
            return 1;
        else
            return 0;
    };
};