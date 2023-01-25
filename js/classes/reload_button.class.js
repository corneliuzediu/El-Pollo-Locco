class Reload extends MovableObject {
    isVisible = false;
    width = 80;
    height = 80;
    y = -(window.innerHeight * 0.5);
    x = window.innerWidth * 0.5;

    IMAGE_RELOAD = [
        './img/start/sync.png',
        './img/start/sync.png'
    ]

    constructor() {
        super().loadImage(this.IMAGE_RELOAD[0]);
        this.loadImages(this.IMAGE_RELOAD)
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (this.isVisible == true) {
                this.playAnimation(this.IMAGE_RELOAD);
            }
        })
    }


    feedbackClick() {
        this.x -= 2;
        this.y -= 2;
        this.width += 4;
        this.height += 4;
    }

    resetReload() {
        this.isVisible = false;
        this.x += 2;
        this.y += 2;
        this.width -= 4;
        this.height -= 4;
    }
}