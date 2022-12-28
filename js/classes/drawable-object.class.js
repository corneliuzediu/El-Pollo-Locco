class DrawableObject {
    x = 150;
    y = 260;
    height = 200;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    
    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image1.png', ...] 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof EndBoss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width - 10, this.height);
            ctx.stroke();
        }
    }

}