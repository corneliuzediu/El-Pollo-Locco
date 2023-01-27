class MovableObject extends DrawableObject {
    /***    Variables   ***/
    speed = 1;
    otherDirection = false;
    speedY = 0;
    acceleration = 4;
    energy = 100;
    coinsBag = 0;
    bottleFuel = 0;
    lastHit = 0;
    world;
    underAtack = false;
    setTimeInterval = 100;
    intervalsID = [];


    applyGravity() {
        setInterval(() => this.bringOnGround(), 35);
    };


    hasJumped() {
        return this.isAboveGround() || this.speedY > 0;
    };


    fallOnGround() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    };


    bringOnGround() {
        if (this.hasJumped())
            this.fallOnGround();
    };


    isAboveGround() {
        if (this instanceof ThrowableObject)
            return true;
        else
            return this.y < 220;
    };


    isCollidingCharacterEnemy(obj) {
        let character_left = (this.x);
        let character_right = (this.x + this.width);
        let character_top = (this.y + 70);
        let character_bottom = (this.y + (this.height - 30));
        let enemy_left = (obj.x + 20);
        let enemy_right = (obj.x + (obj.width - 10));
        let enemy_top = (obj.y + 20);
        let enemy_bottom = (obj.y + (obj.height - 20));
        return this.getContactsCollision(character_left, character_right, character_top, character_bottom, enemy_left, enemy_right, enemy_top, enemy_bottom);
    };


    isCollidingCharacterEnemyFromBottom(obj) {
        let character_left = (this.x);
        let character_right = (this.x + this.width);
        let character_top = (this.y + 70);
        let character_bottom = (this.y + (this.height - 30));
        let enemy_left = (obj.x + 20);
        let enemy_right = (obj.x + (obj.width - 10));
        let enemy_top = (obj.y + 20);
        let enemy_bottom = (obj.y + (obj.height - 20));
        return this.getContactsCollisionFromBottom(character_left, character_right, character_top, character_bottom, enemy_left, enemy_right, enemy_top, enemy_bottom);
    };


    isCollidingCharacterEnemyFromHorizontal(obj) {
        let character_left = (this.x);
        let character_right = (this.x + this.width);
        let character_top = (this.y + 70);
        let character_bottom = (this.y + (this.height - 30));
        let enemy_left = (obj.x + 20);
        let enemy_right = (obj.x + (obj.width - 10));
        let enemy_top = (obj.y + 20);
        let enemy_bottom = (obj.y + (obj.height - 20));
        return this.getContactsCollisionFromHorizontal(character_left, character_right, character_top, character_bottom, enemy_left, enemy_right, enemy_top, enemy_bottom);
    };


    isCollidingCharacterResources(obj) {
        let character_left = (this.x + 20);
        let character_right = (this.x + (this.width - 20));
        let character_top = (this.y + 90);
        let character_bottom = (this.y + (this.height - 30));
        let enemy_left = (obj.x + 30);
        let enemy_right = (obj.x + (obj.width - 40));
        let enemy_top = (obj.y);
        let enemy_bottom = (obj.y + obj.height - 10);
        return this.getContactsCollision(character_left, character_right, character_top, character_bottom, enemy_left, enemy_right, enemy_top, enemy_bottom);
    };


    isCollidingEnemy(obj) {
        return this.y + this.height < obj.y;
    };


    isCollidingGround(obj) {
        return this.y < obj.y + obj.height
    };


    hit() {
        this.outcomeColision();
        setTimeout(() => this.underAtack = false, 200);
    };


    outcomeColision() {
        if (!this.isUnderAtack()) {
            this.underAtack = true; //To mitigate multiple colision;
            if (this.isUnderAtack)
                this.fightEnemies();
        };
    };


    isUnderAtack() {
        return this.underAtack;
    };


    fightEnemies() {
        this.energy -= this.world.level.energyRate;
        if (this.hasNoEnergy())
            this.noEnergy();
        else
            this.registerLastHit();
    };


    hasNoEnergy() {
        return this.energy < 0;
    };


    noEnergy() {
        this.energy = 0;
    };


    registerLastHit() {
        this.lastHit = new Date().getTime();
    };


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed /= 1000;
        return timePassed < 1;
    };


    isDead() {
        return this.energy == 0;
    };


    flipImg(ctx) {
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.x *= -1;
    };


    removeFlipImg(ctx) {
        this.x *= -1;
        ctx.restore();
    };


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };


    moveRight() {
        this.x += this.speed * 24;
        if (this.x > level_end_x * 0.8) {
            endBoss.forEach(boss => {
                boss.isCloser();
            })
        };
    };



    moveLeft() {
        this.x -= this.speed * 24;
    };


    jump() {
        this.speedY = 40;
    };


    collectCoins() {
        let multiplier = level1.coins.length;
        let units = (1 / multiplier) * 100;
        this.coinsBag += units;
        if (this.coinsBag > 90)
            this.coinsBag = 100;
        else
            this.lastCollect = new Date().getTime();
    }


    hasCollected() {
        let timePassed = new Date().getTime() - this.lastCollect;
        timePassed /= 1000;
        return timePassed < 1;
    }


    collectBottle() {
        let unit = 1;
        this.bottleFuel += unit;
        if (this.bottleFuel > 90)
            this.bottleFuel = 100;
        else
            this.lastCollect = new Date().getTime();
    }


    getContactsCollision(character_left, character_right, character_top, character_bottom, enemy_left, enemy_right, enemy_top, enemy_bottom) {
        let contact_right = character_right >= enemy_left && character_right <= enemy_right;
        let contact_left = character_left >= enemy_left && character_left <= enemy_right;
        let contact_top = character_top <= enemy_bottom && character_top >= enemy_top;
        let contact_bottom = character_bottom <= enemy_bottom && character_bottom >= enemy_top;
        let contact_horizontal = character_left < enemy_left && character_right > enemy_right;
        let contact_vertical = character_top < enemy_top && character_bottom > enemy_bottom;
        return contact_right && contact_bottom ||                   // Contact on right bottom
            contact_right && contact_top ||                         // Contact on right top
            contact_left && contact_bottom ||                       // Contact on left top 
            contact_left && contact_top ||                          // Contact on left 
            contact_top && contact_horizontal ||                    // Contact top
            contact_right && contact_vertical ||                    // Contact right
            contact_left && contact_vertical                        // Contact left
    };


    getContactsCollisionFromBottom(character_left, character_right, character_top, character_bottom, enemy_left, enemy_right, enemy_top, enemy_bottom) {
        let contact_bottom = character_bottom + 1 <= enemy_bottom && character_bottom >= enemy_top;
        return contact_bottom;                
    };


    getContactsCollisionFromHorizontal(character_left, character_right, character_top, character_bottom, enemy_left, enemy_right, enemy_top, enemy_bottom) {
        let contact_horizontal = character_left < enemy_left && character_right > enemy_right;
        return contact_horizontal;              
    };


    resetMovableObj() {
        this.speed = 1;
        this.otherDirection = false;
        this.speedY = 0;
        this.acceleration = 4;
        this.energy = 100;
        this.coinsBag = 0;
        this.bottleFuel = 0;
        this.lastHit = 0;
        this.underAtack = false;
    };
}