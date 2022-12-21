class MovableObject {
    x = 80;
    y = 260;
    img;
    height = 200;
    width = 100;
    imageCache ={};

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

/**
 * 
 * @param {Array} arr - ['img/image1.png', 'img/image1.png', ...] 
 */
    loadImages(arr){
        arr.forEach((path) =>{
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    moveRight() {
        console.log('Moveing right')
    }


    moveLeft(x) {
        setInterval(() => {
            this.x -= 0.1;
        }, 1000 / 60)
    }
}