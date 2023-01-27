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


    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image1.png', ...] 
     */
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


    // drawFrame(ctx) {
    //     if (this instanceof Character)
    //         this.hitboxCharacter(ctx);
    //     if (this instanceof Chicken)
    //         this.hitboxChicken(ctx)
    //     if (this instanceof EndBoss)
    //         this.hitboxEndBoss(ctx);
    //     if (this instanceof Bottle || this instanceof Coin)
    //         this.hitboxResources(ctx);
    //     if (this instanceof ThrowableObject)
    //         this.hitboxThrowableObject(ctx);
    //     if (this instanceof Ground)
    //         this.hitboxGround(ctx);
    // }


    // hitboxCharacter(ctx) {
    //     ctx.beginPath();
    //     ctx.lineWidth = '2';
    //     ctx.strokeStyle = 'red';
    //     // ctx.rect(this.x, this.y, this.width, this.height)d;
    //     // ctx.rect(this.x + 20, this.y + 70, this.width - 40, this.height - 80);
    //     ctx.stroke();
    // }

    // hitboxChicken(ctx) {
    //     ctx.beginPath();
    //     ctx.lineWidth = '2';
    //     ctx.strokeStyle = 'blue';
    //     // ctx.rect(this.x, this.y, this.width, this.height);
    //     // ctx.rect(this.x + 20, this.y + 20, this.width - 40, this.height - 40);
    //     ctx.stroke();
    // }


    // hitboxEndBoss(ctx) {
    //     ctx.beginPath();
    //     ctx.lineWidth = '2';
    //     ctx.strokeStyle = 'blue';
    //     // ctx.rect(this.x + 20, this.y + 50, this.width - 20, this.height - 50);
    //     ctx.stroke();
    // }


    // hitboxResources(ctx) {
    //     ctx.beginPath();
    //     ctx.lineWidth = '2';
    //     ctx.strokeStyle = 'blue';
    //     // ctx.rect(this.x + 35, this.y, this.width, this.height);
    //     // ctx.rect(this.x + 20, this.y + 10, this.width - 40, this.height - 20);
    //     ctx.stroke();
    // }


    // hitboxThrowableObject(ctx){
    //     ctx.beginPath();
    //     ctx.lineWidth = '2';
    //     ctx.strokeStyle = 'blue';
    //     // ctx.rect(this.x + 20, this.y + 20, this.width - 40, this.height - 40);
    //     ctx.stroke();
    // }


    // hitboxGround(ctx){
    //     ctx.beginPath();
    //     ctx.lineWidth = '2';
    //     ctx.strokeStyle = 'blue';
    //     // ctx.rect(this.x + 700, this.y,  this.width - 1000, this.height);
    //     ctx.stroke();
    // }


