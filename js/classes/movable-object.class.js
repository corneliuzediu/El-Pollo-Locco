class MovableObject extends DrawableObject{
    speed = 1;
    otherDirection = false;
    speedY = 0;
    acceleration = 4;
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if( this instanceof ThrowableObject){
            return true;
        } else {
            return this.y < 240;
        }
    }


    isColliding(obj) {
        return this.x + this.width > obj.x && this.y + this.height > obj.y && this.x < obj.x && this.y < obj.y + obj.height

        // (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
        //     (this.y + this.offsetY + this.height) >= obj.y &&
        //     (this.y + this.offsetY) <= (obj.y + obj.height) &&
        //     obj.onCollisionCourse;

    }


    hit(){
        this.energy -= 5;
        if( this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed /= 1000;
        return timePassed < 1;
    }


    isDead(){
        return this.energy == 0;
    }


    flipImg(ctx) {
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.x *= -1;
    }


    removeFlipImg(ctx) {
        this.x *= -1;
        ctx.restore();
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed * 24;
    }


    moveLeft() {
        this.x -= this.speed * 24;
    }


    jump() {
        this.speedY = 30;
    }
}