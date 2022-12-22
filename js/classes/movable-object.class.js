class MovableObject {
    x = 150;
    y = 260;
    img;
    height = 200;
    width = 100;
    currentImage = 0;
    imageCache ={};
    speed = 1;
    otherDirection = false;
    speedY = 0;
    acceleration = 4;


    applyGravity(){
        setInterval(()=>{
            if(this.isAboveGround()){
                this.y += this.speedY;
                this.speedY += this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround(){
        return this.y < 240;
    }

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


    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = images[i];
                this.img = this.imageCache[path];
                this.currentImage++;
    }
}