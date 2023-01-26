class Character extends MovableObject {
    /***    Images for animations   ***/
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];


    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];


    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];


    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];


    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];


    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    
    IMAGES_LOST = [
        './img/9_intro_outro_screens/game_over/oh no you lost!.png'
    ]


    /***    Variables   ***/
    currentImage = 0;
    world;
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump2.mp3');
    idle_time = 200;
    sleeping_time = 6000;
    initialTime = 0;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_LOST);
        this.applyGravity();
        this.getTimePassed();
        this.animateCharacter();
    };


    animateCharacter() {
        this.setIntervalFrame(() => this.getCharacterAnimation(), 100);
        this.setIntervalFrame(() => this.getCharacterMovement(), 100);
        this.setIntervalFrame(() => this.getCharacterHurt(), 100);
    };


    getCharacterMovement() {
        this.getTimePassed();
        this.walking_sound.pause();
        if (this.hasThrow())
            this.initialTime = new Date().getTime();
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.jump();
        this.world.camera_x = -this.x + 100;
    };


    getCharacterAnimation() {
        this.getTimePassed();
        if (this.isAboveGround() && !this.isDead())
            this.playAnimation(this.IMAGES_JUMPING);
        else if (this.isAsleep() && !this.isDead())
            this.playAnimation(this.IMAGES_SLEEP);
        else if (this.isIdle() && !this.isDead())
            this.playAnimation(this.IMAGES_IDLE);
        else if (this.isWalking() && !this.isDead())
            this.playAnimation(this.IMAGES_WALKING);
        else if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        };
    };


    getTimePassed() {
        let actualTime = new Date().getTime();
        let timePassed = actualTime - this.initialTime;
        return this.timePassed = timePassed;
    };


    hasThrow() {
        return this.world.keyboard.SPACE;
    };


    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x + 500;
    };


    moveRight() {
        super.moveRight();
        this.initialTime = new Date().getTime();
        this.otherDirection = false;
        this.walking_sound.play();
        this.hurtAndDead;
    };


    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    };

    moveLeft() {
        this.initialTime = new Date().getTime();
        this.otherDirection = true;
        super.moveLeft();
        this.walking_sound.play();
    };


    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround();
    };


    jump() {
        this.initialTime = new Date().getTime();
        super.jump();
        this.jumping_sound.play();
    };


    isAsleep() {
        return this.timePassed > this.sleeping_time;
    };


    isIdle() {
        return this.timePassed < this.sleeping_time && this.timePassed > this.idle_time || this.world.keyboard.SPACE;
    };


    isWalking() {
        return this.world.keyboard.RIGHT && this.timePassed < this.idle_time || this.world.keyboard.LEFT && this.timePassed < this.idle_time;
    };


    getCharacterHurt() {
        if (this.isHurt() && !this.isDead())
            this.playAnimation(this.IMAGES_HURT);
    };
};



