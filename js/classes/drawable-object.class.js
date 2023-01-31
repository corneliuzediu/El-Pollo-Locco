class DrawableObject{
    /***    Variables   ***/
    x = 150;
    y = 245;
    height = 200;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


    /***    Functions   ***/
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
};