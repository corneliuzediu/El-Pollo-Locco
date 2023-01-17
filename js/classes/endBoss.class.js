class EndBoss extends MovableObject {
    height = 350;
    width = 250;
    x = level_end_x + 300; // zahl zwichen 200 und 700
    y = 120;
    alert = false;
    toTheLeft = false;
    bossUnderAtack = false;
    bossAlive = true;
    walkingInterval;
    bossHurtInterval;
    bossDeadInterval;
    speedInterval = 100;

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
    ]

    IMAGES_LIFE = [
        './img/7_statusbars/3_icons/icon_health_endboss.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_LIFE)
        this.animate()
    }


    animate() {
        if (this.bossAlive == true) {
            clearInterval(this.bossDeadInterval);
            this.walkingInterval = setInterval(() => {
                if (this.toTheLeft && this.x > level_end_x + 200) {
                    this.moveLeft();
                    this.playAnimation(this.IMAGES_WALKING);
                }
                if (this.x <= level_end_x + 200) {
                    this.playAnimation(this.IMAGES_ALERT);
                    this.playAnimation(this.IMAGES_ATTACK);
                }
            }, this.speedInterval);

            this.bossHurtInterval = setInterval(() => {
                if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                }
            }, this.speedInterval * 0.5);
            // this.playAnimation(this.IMAGES_ATTACK);
        }
    }


    animateDead() {
        if (this.bossAlive == false) {
            this.bossDeadInterval = setInterval(() => {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                    clearInterval(this.walkingInterval);
                    clearInterval(this.bossHurtInterval);
                }
            }, this.speedInterval);
        }
    }

    isCloser() {
        this.toTheLeft = true;
    }

    hitBoss() {
        if (!this.bossUnderAtack) {
            this.bossUnderAtack = true;
            if (this.bossUnderAtack) {
                this.energy -= 35;
                if (this.energy < 0) {
                    this.bossAlive = false;
                    this.energy = 0;
                    this.animateDead();
                } else {
                    this.lastHit = new Date().getTime();
                }
            }
        }
        setTimeout(() => {
            this.bossUnderAtack = false;
        }, 380)
    }


    isBossHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed /= 1000;
        return timePassed < 1;
    }


    isBossDead() {
        return this.energy == 0;
    }


    resetBoss() {
        clearInterval(this.walkingInterval);
        clearInterval(this.bossHurtInterval);
        clearInterval(this.bossDeadInterval);
        this.currentImage = 0;
        this.bossUnderAtack = false;
        this.toTheLeft = false;
        this.x = level_end_x + 300;
        this.walkingInterval;
        this.speedInterval = 100;
        this.bossAlive = true;
        this.energy = 100;
        this.animate();
    }


}