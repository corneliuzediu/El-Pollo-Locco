class EndBoss extends MovableObject {
    /***    Images for animations   ***/
    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];


    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];


    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];


    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    IMAGES_LIFE = [
        './img/7_statusbars/3_icons/icon_health_endboss.png'
    ];


    /***    Variables   ***/
    height = 350;
    width = 250;
    x = level_end_x + 300;
    y = 120;
    alert = false;
    toTheLeft = false;
    bossUnderAtack = false;
    bossAlive = true;
    walkingInterval;
    bossHurtInterval;
    bossDeadInterval;
    speedInterval = 100;
    hitRate = 35;


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_LIFE);
        this.animateEndBoss();
    }


    animateEndBoss() {
        this.setIntervalFrame(() => this.getEndBossStatus(), this.speedInterval);
    };


    getEndBossStatus() {
        if (this.canComeCloser() && this.isBossAlive())
            this.moveLeft();
        if (this.isCloseToTheBoss() && this.isBossAlive())
            this.bossAttackAnimation();
        if (this.isHurt())
            this.bossHurtAnimation();
        if (this.isDead())
            this.bossDeadAnimation();
    };


    isBossAlive() {
        return this.bossAlive == true;
    };


    canComeCloser() {
        return this.toTheLeft && this.x > level_end_x + 200;
    };


    moveLeft() {
        super.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
        setTimeout(() => this.playAnimation(this.IMAGES_ALERT), 300);
    };


    isCloseToTheBoss() {
        return this.x <= level_end_x + 200; // Register character close to the boss;
    };


    isCloser() {
        this.toTheLeft = true; //Allow boss to move
    };


    bossAttackAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
    };


    bossHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
    };


    bossDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
    };


    isUnderAttack() {
        return this.bossUnderAtack;
    };


    startBattleBoss() {
        this.hitBoss();
        setTimeout(() => this.bossUnderAtack = false, 380)
    };


    hitBoss() {
        if (!this.isUnderAttack()) {
            this.bossUnderAtack = true; //To mitigate multiple colision;
            if (this.isUnderAttack())
                this.outcomeBattleBoss();
        };
    };


    outcomeBattleBoss() {
        this.energy -= this.hitRate;  //Remove energy
        if (this.hasBossNoEnergy())
            this.declareBossDead();
        else
            this.registerLastHit();
    };


    isBossHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed /= 1000;
        return timePassed < 1;
    };


    hasBossNoEnergy() {
        return this.energy < 0;
    };


    declareBossDead() {
        this.bossAlive = false;
        this.energy = 0;
    };


    registerLastHit() {
        this.lastHit = new Date().getTime();
    };


    resetBoss() {
        this.currentImage = 0;
        this.bossUnderAtack = false;
        this.toTheLeft = false;
        this.x = level_end_x + 300;
        this.walkingInterval;
        this.speedInterval = 100;
        this.bossAlive = true;
        this.energy = 100;
    };
};