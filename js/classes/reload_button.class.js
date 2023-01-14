class Reload extends MovableObject {
    isVisible = false;
    width = 80;
    height = 80;
    y = canvas.height * 0.75;
    x = canvas.width / 2 - this.width / 2;

    IMAGE_RELOAD = [
        './img/start/sync.png',
        './img/start/sync.png'
    ]

    constructor() {
        super().loadImage(this.IMAGE_RELOAD[0]);
        this.loadImages(this.IMAGE_RELOAD)
        this.animate();
    }


    animate(){
        setInterval(()=>{
            if(this.isVisible == true){
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
}