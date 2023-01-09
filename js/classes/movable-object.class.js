class MovableObject extends DrawableObject{
    speed = 1;
    otherDirection = false;
    speedY = 0;
    acceleration = 4;
    energy = 100;
    coinsBag = 0;
    bottleFuel = 0;
    lastHit = 0;
    world;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if( this instanceof ThrowableObject ){
            return true;
        } else {
            return this.y < 240;
        }
    }


    isCollidingCharacter(obj) {
        return (this.x +20) + (this.width - 40)  > (obj.x + 10) && (this.y + 70) + (this.height - 80) > (obj.y + 20) && (this.x +20) < (obj.x + 10) && (this.y + 70) < (obj.y + 20) + (obj.height -30);

        // return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
        //     (this.y + this.offsetY + this.height) >= obj.y &&
        //     (this.y + this.offsetY) <= (obj.y + obj.height) &&
        //     obj.onCollisionCourse;

    }


    isCollidingGround(obj) {
        return this.y < obj.y + obj.height 
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


    collectCoins(){
        let multiplier = level1.coins.length;
        let units = (1/multiplier) * 100 ; 
        this.coinsBag += units;
        if( this.coinsBag > 90){
            this.coinsBag = 100;
        } else {
            this.lastCollect = new Date().getTime();
        }
    }

    hasCollected(){
        let timePassed = new Date().getTime() - this.lastCollect;
        timePassed /= 1000;
        return timePassed < 1;
    }


    collectBottle(){
        let unit = 1 ; 
        this.bottleFuel += unit;
        if( this.bottleFuel > 90){
            this.bottleFuel = 100;
        } else {
            this.lastCollect = new Date().getTime();
        }
    }

    




}